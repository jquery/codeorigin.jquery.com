# Allow patch updates
# https://hub.docker.com/_/nginx/
FROM nginx:1.21.1-alpine

RUN apk add vim openrc

# Add CDN assets to the container
#
# Avoid wildcard as that would flatten the directory structure.
#
# This is an early step in the Dockerfile, so that local docker builds
# can reuse this layer and perform a fast rebuild when you only tweaked
# later stuff (nginx config, args, etc.)
COPY cdn/ /var/www/cdn/

# Set a constant file modification timestamp for all CDN assets
#
# Git does not store modified file timestamps, which means the on-disk mtime
# for most files is set to the time of the Git clone. This is a problem
# since the container-based server will be re-created after each commit,
# and we do not want the public "Last-Modified" and "E-Tag" header information
# to roll over after every rebuild.
#
# While Apache has an option to configure how E-Tag is computed (e.g. based on
# content only), Nginx is always based on file mtime and file size.
#
# As a workaround, set a fixed timestamp for all CDN files. This is okay as
# we don't actually utilized Last-Modified or E-Tag for propagating changes,
# we only use them as a way to re-assure browsers that files haven't changed
# and thus reduce bandwidth from needless re-transfers. Given our maximum
# Cache-Control "max-age", it is already the case that a changed file will not
# be seen by the CDN unless we purge it via the CDN API, and not seen by previous
# browser clients until they clear their own caches.
#
RUN find /var/www/cdn/ -type f -print0 | TZ=UTC xargs -0 -P 4 -n 50 touch --date='1991-10-18 12:00:00' {} +

# Copy in the necessary config files
COPY cfg/vimrc /etc/vim/vimrc
COPY cfg/default.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

