FROM nginx:alpine

RUN apk add vim
COPY cfg/vimrc /etc/vim/vimrc
COPY cfg/config-sample.json /usr/share/nginx/html/

ARG CDN_ACCESS_KEY=''
ARG CDN_PURGE_API_TOKEN=''
ARG CDN_PURGE_ACCOUNT_HASH=''
COPY cfg/default.conf /etc/nginx/conf.d/default.conf

# If the CDN_ACCESS_KEY environment variable is *not* set, operate in "break glass" mode where the
# container responds to all requests. Otherwise, look for the secret header the CDN adds to origin
# pulls and only allow responses to those requests, and 301 the rest back to the CDN.

RUN if [ -n "$CDN_ACCESS_KEY" ]; then \
    sed -i s/##PLACEHOLDER-cdn_header_detection-DO_NOT_CHANGE##/"map \$http_cdn_access \$reroute_to_cdn { default '1'; $CDN_ACCESS_KEY '0'; }"/g /etc/nginx/conf.d/default.conf && \
    sed -i s/##PLACEHOLDER-cdn_reroute-DO_NOT_CHANGE##/"if (\$reroute_to_cdn) { return 301 \$scheme:\/\/code.jquery.com\$uri; }"/g /etc/nginx/conf.d/default.conf; \
  fi

# Load the releases into the container

COPY cdn/* /usr/share/nginx/html/
COPY git/* /usr/share/nginx/html/

# If the CDN_PURGE_API_TOKEN and CDN_PURGE_ACCOUNT_HASH are defined, create the config.json file
# that holds credentials used by purge.php to trigger the Highwinds purge API.

RUN if [ -n "$CDN_PURGE_API_TOKEN" -a -n "$CDN_PURGE_ACCOUNT_HASH" ]; then \
    cp /usr/share/nginx/html/config-sample.json /usr/share/nginx/html/config.json && \
    sed -i s/example_token/"$CDN_PURGE_API_TOKEN"/g /usr/share/nginx/html/config.json && \
    sed -i s/example_hash/"$CDN_PURGE_ACCOUNT_HASH"/g /usr/share/nginx/html/config.json; \
  fi

EXPOSE 80

