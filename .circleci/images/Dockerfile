# Based on the pre-built CircleCI Node image
# See https://circleci.com/docs/2.0/circleci-images/#nodejs
FROM circleci/node:latest
LABEL maintainer="matt.tyas@coopdigital.co.uk"

# Add Ruby.
# TODO Do we need ruby-full?
RUN sudo curl -sSL https://rvm.io/mpapis.asc | gpg --import --no-tty
RUN sudo curl -sSL https://get.rvm.io | bash -s stable

RUN sudo rvm install ruby-2.5.1
RUN sudo rvm --default use 2.5.1


# Install Bundler.
RUN sudo gem install bundler
