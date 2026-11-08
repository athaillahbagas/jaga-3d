# JAGA — Tampilan 3D

Halaman web untuk melihat model konsep JAGA langsung di browser. Model dapat diputar dan di-zoom dengan mouse atau sentuhan; pengunjung tidak perlu memasang Blender.

[Buka penampil 3D JAGA](https://athaillahbagas.github.io/jaga-3d/) · [Repositori](https://github.com/athaillahbagas/jaga-3d)

Model GLB, pratinjau, sumber Blender, dan pustaka penampil disimpan bersama proyek. Halaman ini statis dan tidak memerlukan proses build.

## Jalankan di komputer

Dari folder proyek, jalankan:

```sh
python3 -m http.server 8765
```

Buka [localhost:8765](http://localhost:8765). Gunakan alamat server ini agar browser dapat memuat model GLB dengan benar.

## Berkas utama

- `index.html`, `styles.css`, dan `app.js`: tampilan dan interaksi halaman.
- `assets/JAGA_Product.glb`: model untuk penampil web.
- `assets/poster.png`: pratinjau sebelum model termuat.
- `downloads/JAGA_Product.blend`: sumber yang dapat diedit di Blender.
- `vendor/model-viewer.min.js`: penampil `@google/model-viewer` 4.4.0.

Alamat berkas menggunakan path relatif seperti `./assets/JAGA_Product.glb`, sehingga halaman tetap bekerja saat dipasang di alamat proyek GitHub Pages seperti `https://USERNAME.github.io/NAMA-REPO/`.

## Publikasikan lewat GitHub Pages

Alamat GitHub Pages proyek ini: **https://athaillahbagas.github.io/jaga-3d/**.
Pengaturan publikasi: branch **main**, folder **/(root)**. Langkah berikut dapat dipakai saat menyiapkan ulang publikasi.

1. Buat repositori GitHub dan unggah seluruh isi folder proyek, termasuk `assets`, `downloads`, `vendor`, dan `.nojekyll`.
2. Simpan berkas di branch `main`, dengan `index.html` di root repositori.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch **main** dan folder **/(root)**, lalu **Save**.
6. Tunggu proses publikasi selesai. Buka alamat yang ditampilkan GitHub Pages, lalu bagikan alamat tersebut.

Panduan resmi: [menentukan sumber GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Status model

Model ini merekonstruksi dua gambar desain dan video referensi. Ukuran bodi sekitar 100 × 90 × 46 mm dan tinggi dengan dudukan sekitar 88 mm adalah perkiraan proporsi. Branding juga direkonstruksi secara visual. Komponen internal, ketebalan teknik, dan toleransi perakitan belum dimodelkan; berkas ini belum merupakan CAD produksi atau model siap cetak 3D.

Lisensi pustaka penampil dijelaskan di [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md). Lisensi tersebut tidak memberikan lisensi atas merek, logo, atau model JAGA.
