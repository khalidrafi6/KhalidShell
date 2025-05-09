+++
title = "How to Do Common PDF Tasks in Linux"
date = "2025-05-09"
lastmod = "2025-05-09"
author = ""
authorTwitter = ""
cover = ""
Toc = true
tags = ["Linux", "PDF"]
keywords = ["", ""]
description = "Learn how to split, merge, extract pages, reorder, and convert PDFs on Linux using command-line tools like pdftk, pdfunite, and GUI tools like PDF Arranger."
showFullContent = false
hideComments = false
+++
We often need to do PDF tasks like splitting pages, merging multiple PDFs, rearranging pages, etc. New Linux users might struggle with these. Let's see how to do these common PDF tasks on Linux:
<br><br>

## 0. Before we start
### *Required Packages*
- [PDF Arranger](https://repology.org/project/pdfarranger/versions)
- [Poppler](https://repology.org/project/poppler/versions)
- [PDFtk](https://repology.org/project/pdftk/versions)
- [GraphicsMagick](https://repology.org/project/graphicsmagick/)

### *Installation*
- Debian:  
  ```bash  
  sudo apt install pdfarranger poppler-utils pdftk-java graphicsmagick
- Arch Linux:
  ```bash
  sudo pacman -S pdfarranger poppler pdftk graphicsmagick
 <br>
 
## 1. How to split PDF pages in Linux

You can split the pages of a PDF in two ways - vertically and horizontally. Both can be done in **PDF Arranger**.

**Method:**  
- Open file in **PDF Arranger**
- Select pages to split (right-click for selection options)
- Right-click again and choose **Split Pages**
- You'll find two options here: **Vertical Splits** and **Horizontal Splits**. Enter how many vertical splits you want in **Vertical Splits**. For horizontal splits, specify the number in **Horizontal Splits**.

    - If you only want to split vertically, enter 1 in the **Horizontal Splits** field.
    - If you only want to split horizontally, enter 1 in the **Vertical Splits** field.
- **Save (`CTRL + S`)** or use **Save as (`CTRL + Shift + S`)** for custom location/name

## 2. How to merge multiple PDFs in Linux

Often we need to combine multiple PDFs into a new one. You can easily do this using `pdfunite` from **Poppler**:

```bash
pdfunite first.pdf second.pdf third.pdf output.pdf
```

## 3. How to extract PDF pages in Linux

If you need to extract one or more pages from a PDF:

- ### To extract a range of pages into a single PDF
```bash
pdftk infile.pdf cat first-last output outfile.pdf
```
Here, replace `first` with the page number of the first page you want to extract from the main file. Similarly, replace `last` with the page number of the last page.

- ### To create separate PDFs for each extracted page
```bash
pdfseparate -f first -l last infile.pdf outfile-%d.pdf
```
This command will create separate PDFs for each page from `first` to `last`. If you only want to extract one page, use that page's number for both `first` and `last`. In this case, you can omit `%d` from the output filename.

## 4. How to reorder PDF pages in Linux

In **PDF Arranger**, you can easily rearrange PDF pages via drag-and-drop. Open the desired file, left-click and hold to drag pages to their new positions. Don't forget to save when done.

## 5. How to create PDF from images in Linux

To combine multiple images into a PDF, use this command:
```bash
gm convert 1.jpg 2.jpg 3.jpg out.pdf
```

## 6. How to convert a PDF to images in Linux

- ### To convert each page to an image
```bash
pdftoppm -jpeg input.pdf output
```

- ### To convert a specific page to an image
```bash
pdftoppm -jpeg -f page -singlefile input.pdf output
```
<br>
This tutorial covered common PDF operations on Linux. Notice how command-line tools are often simpler and more powerful than GUI alternatives. Therefore, my advice to new users is to get comfortable using the terminal. Thanks for reading!
<br><br>
<br>

> Some information was collected from ArchWiki. Learn more at [this link](https://wiki.archlinux.org/title/PDF,_PS_and_DjVu).
