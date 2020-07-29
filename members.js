// List of P39 data for this term. Fetch with:
//     wd sparql members.js <membership-qid> <term-qid> | tee wikidata.json

module.exports = (membership, term) => `
  SELECT ?statement ?item ?itemLabel ?party ?partyLabel ?district ?districtLabel
          ?election ?electionLabel ?start ?startPrecision ?end ?endPrecision ?cabinet WHERE {
    ?item wdt:P31 wd:Q5; p:P39 ?statement.
    ?statement ps:P39 wd:${membership} ; pq:P2937 wd:${term} .
    MINUS { ?statement wikibase:rank wikibase:DeprecatedRank. }

    OPTIONAL { ?statement pqv:P580 [ wikibase:timeValue ?start; wikibase:timePrecision ?startPrecision ] }
    OPTIONAL { ?statement pqv:P582 [ wikibase:timeValue ?end; wikibase:timePrecision ?endPrecision ] }
    OPTIONAL { ?statement pq:P4100 ?party }
    OPTIONAL { ?statement pq:P768  ?district }
    OPTIONAL { ?statement pq:P2715 ?election }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  ORDER BY ?start
`
