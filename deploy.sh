#!/bin/sh
set -eu

cd "$(dirname "$0")"

DEST=ubuntu@sv:/usr/share/nginx/freks.jp/

# 公開に必要なファイルだけを転送する
# --delete は付けない（apps/diff などリポジトリ外のページがサーバー上にあるため）
rsync -C -rltuvz \
  --exclude='.gitkeep' \
  ./*.html \
  ./favicon.ico \
  ./favicon.ico.gz \
  ./robots.txt \
  ./sitemap.xml \
  ./css \
  ./img \
  ./js \
  ./apps \
  ./tips \
  "$DEST"
