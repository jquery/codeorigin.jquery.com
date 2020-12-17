FROM nginx:alpine

RUN apk add vim
COPY cfg/vimrc /etc/vim/vimrc


ARG CDN_ACCESS_KEY=''
COPY cfg/default.conf /etc/nginx/conf.d/default.conf

# If the CDN_ACCESS_KEY environment variable is *not* set, operate in "break glass" mode where the
# container responds to all requests. Otherwise, look for the secret header the CDN adds to origin
# pulls and only allow responses to those requests, and 301 the rest back to the CDN.

RUN if [ -n "$CDN_ACCESS_KEY" ]; then \
    sed -i s/##PLACEHOLDER-cdn_header_detection-DO_NOT_CHANGE##/"map \$http_cdn_access \$reroute_to_cdn { default '1'; $CDN_ACCESS_KEY '0'; }"/g /etc/nginx/conf.d/default.conf && \
    sed -i s/##PLACEHOLDER-cdn_reroute-DO_NOT_CHANGE##/"if (\$reroute_to_cdn) { return 301 \$scheme:\/\/code.jquery.com\$uri; }"/g /etc/nginx/conf.d/default.conf; \
  fi

COPY cdn/* /usr/share/nginx/html/
COPY git/* /usr/share/nginx/html/

EXPOSE 80

