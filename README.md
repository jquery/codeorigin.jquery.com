codeorigin.jquery.com
=====================

## Add new assets

To publish a new release, project maintainers should commit new assets to the `cdn/` directory and push to the `main` branch. The jQuery CDN (code.jquery.com) and releases site (releases.jquery.com) will both automatically rebuild.

-------

## jQuery CDN

The jQuery CDN assets are served from a static file server (Nginx), provisioned through Docker.

Prerequisites:
* Docker (see [Docker CE for Linux](https://docs.docker.com/install/#server), [Docker for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac), or [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)).
* Git.

### Local development

**Build the image**:

Build the image, by running the following in a clone of this repo:

```
docker build -t codeorigin ./
```

**Test the container in open mode**:

1. Start a container, exposing port 80:
   ```
   docker run --rm -p 4000:80/tcp codeorigin
   ```
1. The site is now running at <http://localhost:4000/jquery-3.0.0.js>.
   To stop the container, press `ctrl+c`

**Inspect the container**:

Run it with a shell entrypoint and set interactive/tty mode by adding the parameters `-i -t --entrypoint /bin/sh`.
Note that when inspecting the container, nginx will not be started.

```
docker run --rm -p 4000:80/tcp -it --entrypoint /bin/sh codeorigin

# /docker-entrypoint.d/20-envsubst-on-templates.sh 3>&1
...
# cat /etc/nginx/conf.d/default.conf
...
```

Inspect restricted mode:

```
docker run --rm -p 4000:80/tcp -e "CDN_ACCESS_KEY=$CDN_ACCESS_KEY" -it --entrypoint /bin/sh codeorigin
```

**Debug nginx**:

In `cfg/defualt.conf`, change `error_log … crit` to `error_log … debug` and then build+run as usual.

**Test the container in restricted mode**:

There is a restricted mode, which responds to unauthorized static file requests with a redirect instead of serving files.

1. Run `export CDN_ACCESS_KEY="$(openssl rand -hex 32)"`
1. Start a container, exposing port 80, and given the environment variable:
   ```
   docker run --rm -p 4000:80/tcp -e "CDN_ACCESS_KEY=$CDN_ACCESS_KEY" codeorigin
   ````
1. The site is now running at <http://localhost:4000/jquery-3.0.0.js>.
   To stop the container, press `ctrl+c`

In the restricted mode:

* Simple requests for static files redirect to `code.jquery.com/*`, e.g. `curl -i 'http://localhost/jquery-3.0.0.js'`.
* Requests with the access key will respond by serving the file: `curl -i -H "x-cdn-access: $CDN_ACCESS_KEY" 'http://localhost/jquery-3.0.0.js'`
* Requests with an invalid key will redirect the same as without: `curl -i -H "x-cdn-access: wrong" 'http://localhost/jquery-3.0.0.js'`

### Production deployment

1. First, generate a CDN access key: `openssl rand -hex 32`.
1. At a hosting platform of your choosing, build or pull the container, and pass the CDN access key as run environment variable.
1. Finally, configure the CDN to use the container address as its origin, with special handling to augment origin pulls with a `Host: code.jquery.com` header, and a `x-cdn-access` header with the access key.

### In case of emergency

If you need to deploy a standalone codeorigin site immediately, or if there are origin pull failures and you're not sure why, then deploy the container without any `CDN_ACCESS_KEY` environment variable. The codeorigin container then default to its unrestricted mode (no offload redirects).

-------

## WordPress build

This repository is also used to update the asset catalog at <https://releases.jquery.com/>, which is an auto-generated WordPress site.

To preview changes for a [`jquery-wp-content`](https://github.com/jquery/jquery-wp-content) instance, follow the [workflow instructions](http://contribute.jquery.org/web-sites/#workflow) from our documentation on [contributing to jQuery Foundation web sites](http://contribute.jquery.org/web-sites/).
