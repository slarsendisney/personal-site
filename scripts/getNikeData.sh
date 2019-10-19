#!/usr/bin/env bash

rm -rfv data/nike/*

mkdir data/nike/activity-files
mkdir data/nike/all

readonly bearer_token="$1"
if [[ -z "$bearer_token" ]]; then
  echo "Usage: $0 bearer_token"
  exit
fi

if ! type jq >/dev/null 2>&1; then
  echo "Missing jq, please install it. e.g. brew install jq" >&2
  exit 1
fi

nike_plus_api() {
  curl -H "Authorization: Bearer ${bearer_token}" "$@"
}

activity_ids=()
activities_page=0
while true; do
  activities_file="data/nike/activity-files/activities-${activities_page}.json"
  if [[ -z "$after_id" ]]; then
    url="https://api.nike.com/sport/v3/me/activities/after_time/0"
  else
    url="https://api.nike.com/sport/v3/me/activities/after_id/${after_id}"
  fi

  echo "Fetch $url..."
  nike_plus_api "$url" > "$activities_file"

  activity_ids=("${activity_ids[@]}" $(jq -r ".activities[].id" "$activities_file"))
  after_id=$(jq -r ".paging.after_id" "$activities_file")
  if [[ "$after_id" == "null" ]]; then
    break
  else
    activities_page=$((activities_page + 1));
  fi
done

jq -s '[.[].activities[]]' data/nike/activity-files/*.json > data/nike/all/nike.json