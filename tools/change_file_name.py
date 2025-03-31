from pathlib import Path
import os

from sympy import fu

curr_dir = Path(__file__).parent.parent
dir = curr_dir.joinpath('ui', 'src', 'shared-theme')
root = os.walk(curr_dir)
print(dir, root )
for root, _, files in os.walk(dir):
    # print(root, _, files)
    for r, _r, _f in os.walk(root):
        for file in enumerate(_f):
            if str(file[1]).lower().endswith('.js'):
                original_name = file[1]
                # Construct the full file path
                full_path = os.path.join(r, original_name)
                # rn = os.rename(file[1], file[1].replace('.js', '.jsx'))
                # print(full_path)
                new_name = original_name.replace('.js', '.jsx')
                new_full_path = os.path.join(r, new_name)
                
                # Attempt to rename the file
                try:
                    os.rename(full_path, new_full_path)
                    print(f"Renamed: {full_path} -> {new_full_path}")
                except FileNotFoundError:
                    print(f"File not found: {full_path}")
                except Exception as e:
                    print(f"An error occurred: {e}")


# wrokin  properly