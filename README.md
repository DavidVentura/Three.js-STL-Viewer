# STL Viewer
Load an stl model and display it.

# Web server
nginx example block

```
server {
    listen 8098;
    root /home/david/git/Three.js-STL-Viewer;
    location ~ /models {
        try_files $uri =404;
    }
    location ~ /js {
        try_files $uri =404;
    }
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

# Back end service

`stl-webapp.service`
