from __future__ import annotations

import logging
from pathlib import Path

from PIL import Image


LOGGER = logging.getLogger(__name__)
SOURCE_IMAGES: tuple[Path, ...] = (Path("kapakfoto.png"), Path("logo.png"))
MAX_IMAGE_WIDTH = 800
WEBP_QUALITY = 80


def optimize_image(source_path: Path, max_width: int = MAX_IMAGE_WIDTH) -> bool:
    if not source_path.exists():
        LOGGER.warning("Image source file was not found", extra={"path": str(source_path)})
        return False

    original_size = source_path.stat().st_size
    with Image.open(source_path) as image:
        optimized_image = resize_image(image, max_width)
        target_path = source_path.with_suffix(".webp")
        optimized_image.save(target_path, "WEBP", quality=WEBP_QUALITY)

    optimized_size = target_path.stat().st_size
    LOGGER.info(
        "Optimized image",
        extra={
            "source": str(source_path),
            "target": str(target_path),
            "original_kb": round(original_size / 1024, 2),
            "optimized_kb": round(optimized_size / 1024, 2),
            "saved_kb": round((original_size - optimized_size) / 1024, 2),
        },
    )
    return True


def resize_image(image: Image.Image, max_width: int) -> Image.Image:
    if image.width <= max_width:
        return image.copy()

    scale_ratio = max_width / image.width
    target_height = int(image.height * scale_ratio)
    return image.resize((max_width, target_height), Image.Resampling.LANCZOS)


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    for source_path in SOURCE_IMAGES:
        optimize_image(source_path)


if __name__ == "__main__":
    main()
