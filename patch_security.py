from __future__ import annotations

import logging
import re
from argparse import ArgumentParser, Namespace
from pathlib import Path


LOGGER = logging.getLogger(__name__)
TARGET_BLANK_ANCHOR_PATTERN = re.compile(
    r"<a\s+[^>]*target=[\"']_blank[\"'][^>]*>",
    flags=re.IGNORECASE,
)
TARGET_BLANK_ATTRIBUTE_PATTERN = re.compile(r"target=([\"'])_blank\1", flags=re.IGNORECASE)
REL_ATTRIBUTE_PATTERN = re.compile(r"\srel=([\"'])(.*?)\1", flags=re.IGNORECASE)
REQUIRED_REL_VALUES = ("noopener", "noreferrer")


def build_safe_anchor_tag(anchor_match: re.Match[str]) -> str:
    anchor_tag = anchor_match.group(0)
    rel_match = REL_ATTRIBUTE_PATTERN.search(anchor_tag)
    if rel_match is None:
        return TARGET_BLANK_ATTRIBUTE_PATTERN.sub(
            r'target=\1_blank\1 rel="noopener noreferrer"',
            anchor_tag,
            count=1,
        )

    quote = rel_match.group(1)
    rel_values = rel_match.group(2).split()
    merged_values = merge_rel_values(rel_values)
    return (
        f"{anchor_tag[:rel_match.start()]} rel={quote}{' '.join(merged_values)}{quote}"
        f"{anchor_tag[rel_match.end():]}"
    )


def merge_rel_values(existing_values: list[str]) -> list[str]:
    normalized_values = [value.lower() for value in existing_values]
    merged_values = list(existing_values)

    for required_value in REQUIRED_REL_VALUES:
        if required_value not in normalized_values:
            merged_values.append(required_value)

    return merged_values


def patch_file(file_path: Path, *, should_write: bool) -> bool:
    content = file_path.read_text(encoding="utf-8")
    updated_content = TARGET_BLANK_ANCHOR_PATTERN.sub(build_safe_anchor_tag, content)
    updated_content = updated_content.replace("kapakfoto.png", "kapakfoto.webp")
    updated_content = updated_content.replace("logo.png", "logo.webp")

    if content == updated_content:
        LOGGER.debug("No changes needed", extra={"path": str(file_path)})
        return False

    if should_write:
        file_path.write_text(updated_content, encoding="utf-8")
        LOGGER.info("Patched file", extra={"path": str(file_path)})
        return True

    LOGGER.warning("File requires patching", extra={"path": str(file_path)})
    return True


def find_html_files(root_path: Path) -> list[Path]:
    return sorted(
        file_path
        for file_path in root_path.rglob("*.html")
        if ".git" not in file_path.parts
    )


def parse_args() -> Namespace:
    argument_parser = ArgumentParser(description="Patch static HTML security metadata.")
    argument_parser.add_argument(
        "--check",
        action="store_true",
        help="Fail if any HTML file still requires patching without writing files.",
    )
    return argument_parser.parse_args()


def main() -> int:
    args = parse_args()
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    patched_count = sum(
        1
        for file_path in find_html_files(Path("."))
        if patch_file(file_path, should_write=not args.check)
    )
    LOGGER.info("Security patch completed", extra={"patched_count": patched_count})
    if args.check and patched_count > 0:
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
