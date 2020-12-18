FROM nginx:alpine

# Install pre-reqs, since we're doing everything in one container for minimum complexity
RUN apk add vim openrc php7 php7-fpm php7-openssl php7-curl php7-json

# Define the environment variable that will be used in the origin pull magic header
ARG CDN_ACCESS_KEY=''

# Define the environment variables used by purge.php
ARG CDN_PURGE_API_TOKEN=''
ARG CDN_PURGE_ACCOUNT_HASH=''
ENV CDN_PURGE_API_TOKEN=$CDN_PURGE_API_TOKEN
ENV CDN_PURGE_ACCOUNT_HASH=$CDN_PURGE_ACCOUNT_HASH

# Copy in the necessary config files
COPY cfg/vimrc /etc/vim/vimrc
COPY cfg/default.conf /etc/nginx/conf.d/default.conf
COPY cfg/purge.php /usr/share/nginx/html/

# If the CDN_ACCESS_KEY environment variable is *not* set, operate in "break glass" mode where the
# container responds to all requests. Otherwise, look for the secret header the CDN adds to origin
# pulls and only allow responses to those requests, and 301 the rest back to the CDN.
#
# Note: We're writing directly to the config files because nginx does not currently have a way to
# access environment variables without significant workarounds. Furthermore, the variables are
# required because nginx does not currently support nested if statements.
RUN if [ -n "$CDN_ACCESS_KEY" ]; then \
    sed -i s/##PLACEHOLDER-cdn_header_detection-DO_NOT_CHANGE##/"map \$http_cdn_access \$reroute_to_cdn { default '1'; $CDN_ACCESS_KEY '0'; }"/g /etc/nginx/conf.d/default.conf && \
    sed -i s/##PLACEHOLDER-cdn_reroute-DO_NOT_CHANGE##/"if (\$reroute_to_cdn) { return 301 \$scheme:\/\/code.jquery.com\$uri; }"/g /etc/nginx/conf.d/default.conf; \
  fi

# Load the releases into the container
COPY cdn/* /usr/share/nginx/html/

# Copy in a script to start php-fpm7
COPY cfg/30-start-php-fpm7.sh /docker-entrypoint.d/

EXPOSE 80

