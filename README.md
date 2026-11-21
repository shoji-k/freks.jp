# freks.jp

## develop

Run web server whatever.

```sh
ruby -run -e httpd . -p 8000
```

## deploy

### first-time setup

Create the document root on the server and give it to `ubuntu`, so that rsync can write to it without sudo.

```sh
ssh ubuntu@sv 'sudo mkdir -p /usr/share/nginx/freks.jp && sudo chown ubuntu:ubuntu /usr/share/nginx/freks.jp'
```

### run

```sh
./deploy.sh
```

`deploy.sh` copies only the files needed to serve the site to `ubuntu@sv:/usr/share/nginx/freks.jp/`. It does not use `--delete`, because some pages under `/apps/` live only on the server.

Files removed from this repository are not removed from the server. Delete them on the server manually.

### note

app  
apps  
tips  
は別リポジトリから生成されたコードを設置する  

TODO: 手順作成
