codeorigin.jquery.com
=====================

## Add new assets

To publish a new release, project maintainers should commit new assets to the `cdn/` directory and push to the `main` branch. The jQuery CDN (code.jquery.com) and releases site (releases.jquery.com) will both automatically rebuild.

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

**Test the container**:

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

**Debug nginx**:

In `cfg/default.conf`, change `error_log … crit` to `error_log … debug` and then build+run as usual.

### Production deployment

1. At a hosting platform of your choosing, build or pull the container.
1. Finally, configure the CDN to use the container address as its origin, with special handling to augment origin pulls with a `Host: code.jquery.com` header.

-------

## WordPress build

This repository is also used to update the asset catalog at <https://releases.jquery.com/>, which is an auto-generated WordPress site.

To preview changes for a [`jquery-wp-content`](https://github.com/jquery/jquery-wp-content) instance, follow the [workflow instructions](http://contribute.jquery.org/web-sites/#workflow) from our documentation on [contributing to jQuery Foundation web sites](https://contribute.jquery.org/web-sites/).
