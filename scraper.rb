#!/bin/env ruby
# frozen_string_literal: true

require 'pry'
require 'scraped'
require 'wikidata_ids_decorator'

require_relative 'lib/scraped_wikipedia_positionholders'
require_relative 'lib/wikipedia_members_page'
require_relative 'lib/wikipedia_membership_row'

# The Wikipedia page with a list of officeholders
class ListPage < WikipediaMembersPage
  decorator WikidataIdsDecorator::Links

  def wanted_tables
    tables_with_header('Kommentarer')
  end
end

# Each officeholder in the list
class MembershipRow < WikipediaMembershipRow
  def columns
    %w[name party _notes]
  end

  field :election do
    'Q1575198'
  end

  field :start_date do
    '2001-10-01'
  end
end

url = ARGV.first || abort("Usage: #{$0} <url to scrape>")
puts Scraped::Wikipedia::PositionHolders.new(url => ListPage).to_csv
