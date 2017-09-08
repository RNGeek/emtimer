FROM netlify/build

USER root
RUN curl https://raw.githubusercontent.com/netlify/build-image/master/run-build-functions.sh -o /usr/local/bin/run-build-functions.sh
USER buildbot
