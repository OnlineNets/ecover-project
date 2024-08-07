import os
from psd_tools import PSDImage
from PIL import Image

def insert_image_into_psd(psd_file, output_file):
    try:
        # Get the absolute path of the PSD file
        psd_path = os.path.abspath(psd_file)

        # Get the directory of the PSD file
        psd_dir = os.path.dirname(psd_path)

        # Resolve the output file paths
        png_output_path = os.path.join(psd_dir, output_file + ".png")

        psd = PSDImage.open(psd_path)
        psd.composite(force=True).save(png_output_path)
        print("Image inserted into the specified layer and saved as PSD and PNG.")
    except Exception as err:
        print(f"An error occurred: {err}")

psd_file = "mockupfiles/output_psd.psd"
output_file = "result_origin"

insert_image_into_psd(psd_file, output_file)