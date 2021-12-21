## need to release

```sh
npx gulp
```

## develop

```sh
npx watch
```

Run web server whatever.

```sh
ruby -run -e httpd . -p 8000
```

## deploy

```bash
rsync -C -rltuvz ./index.html dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./404.html dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./50x.html dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./favicon.ico dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./robots.txt dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./css dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./tips dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./img dev:/usr/share/nginx/freks.jp/
rsync -C -rltuvz ./apps dev:/usr/share/nginx/freks.jp/
```