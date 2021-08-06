FROM nginx:alpine

# Install pre-reqs, since we're doing everything in one container for minimum complexity
RUN apk add vim openrc

# Define the environment variable that will be used in the origin pull magic header
ARG CDN_ACCESS_KEY=''

# Copy in the necessary config files
COPY cfg/vimrc /etc/vim/vimrc
COPY cfg/default.conf /etc/nginx/conf.d/default.conf

# If the CDN_ACCESS_KEY environment variable is *not* set, operate in "break glass" mode where the
# container responds to all requests. Otherwise, look for the secret header the CDN adds to origin
# pulls and only allow responses to those requests, and 301 the rest back to the CDN.
#
# Note: We're writing directly to the config files because nginx does not currently have a way to
# access environment variables without significant workarounds. Furthermore, the variables are
# required because nginx does not currently support nested if statements.
RUN if [ -n "$CDN_ACCESS_KEY" ]; then \
    sed -i s/CDN_ACCESS_KEY_PLACEHOLDER/$CDN_ACCESS_KEY/g /etc/nginx/conf.d/default.conf && \
    sed -i s/##ACTIVATE-XCDNACCESS##//g /etc/nginx/conf.d/default.conf; \
  fi

# Load the releases into the container
COPY cdn/ /usr/share/nginx/html/

EXPOSE 80

