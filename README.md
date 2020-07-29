Note: This repo is largely a snapshop record of bring Wikidata
information in line with Wikipedia, rather than code specifically
deisgned to be reused.

The code and queries etc here are unlikely to be updated as my process
evolves. Later repos will likely have progressively different approaches
and more elaborate tooling, as my habit is to try to improve at least
one part of the process each time around.

---------

Step 1: Tracking page
=====================

I set up a Listeria page for the term. Version before updates is at:
https://www.wikidata.org/w/index.php?title=Wikidata:WikiProject_every_politician/Norway/data/Storting/2001-2005&oldid=1241434191

No-one currently has an 'elected in' qualifier.

Step 2: Set up the metadata
===========================

Edited [add_P39.js script](add_P39.js) to configure the P39 data, and
source URL.

Step 3: Get local copy of Wikidata information
==============================================

    wd ee --dry add_P39.js | jq -r '"\(.claims.P39.value) \(.claims.P39.qualifiers.P2937)"' | 
      xargs wd sparql members.js > wikidata.json

Step 4: Scrape
==============

Comparison/source = https://no.wikipedia.org/wiki/Liste_over_stortingsrepresentanter_2001%E2%80%932005

    wb ee --dry add_P39.js  | jq -r '.claims.P39.references.P4656' |
      xargs bundle exec ruby scraper.rb | tee wikipedia.csv

This has a different table layout from the later terms, and would be
straightforward except the tables use 'td' cells for headings, rather
than 'th' cells. Rather than adjust the scaper, I chose to update the
nowiki page, running the tables through:

    pbpaste | sed -e 's/|Navn/!Navn/' -e 's/|Parti/!Parti/' -e 's/|Kommentarer/!Kommentarer/' | pbcopy

Getting the constituency would be more tricky here, especially as
they're not linked to anything, but that's the field we're skipping
anyway due to administrative area / electoral district mismatching, so
can continue to ignore it.

Step 6: Add missing 'elected in' qualifiers
===========================================

    bundle exec ruby new-qualifiers.rb wikipedia.csv wikidata.json | fgrep P2715 |
      wd aq --batch --summary "Add elected in qualifiers, from $(wb ee --dry add_P39.js | jq -r '.claims.P39.references.P4656')"

165 additions made as https://tools.wmflabs.org/editgroups/b/wikibase-cli/cc501e605376c/

Step 7: Refresh the Tracking Page
==================================

New version at https://www.wikidata.org/w/index.php?title=Wikidata:WikiProject_every_politician/Norway/data/Storting/2001-2005&oldid=1241469549


