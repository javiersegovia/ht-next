FROM ruby:2.7
ENV LANG=C.UTF-
ENV LC_ALL=C.UTF-8
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /ht_api
WORKDIR /ht_api
COPY Gemfile /ht_api/Gemfile
COPY Gemfile.lock /ht_api/Gemfile.lock

ENV BUNDLE_PATH /ht_api/.gems
ENV GEM_HOME /ht_api/.gems

COPY . /ht_api

RUN bundle install

# Add a script to be executed every time the container starts.
COPY bin/rails_entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/rails_entrypoint.sh
ENTRYPOINT ["rails_entrypoint.sh"]
EXPOSE 3000

# Start the main process.
# CMD ["rails", "server", "-b", "0.0.0.0"]