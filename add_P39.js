module.exports = (id, party, district, startdate, enddate, election) => {
  const qualifiers = { }

  // Seems like there should be a better way of filtering these...
  if (party && party != "''")           qualifiers['P4100'] = party
  if (district && district != "''")     qualifiers['P768']  = district
  if (startdate && startdate != "''")   qualifiers['P580']  = startdate
  if (enddate && enddate != "''")       qualifiers['P582']  = enddate
  if (election && election != "''")     qualifiers['P2715'] = election

  if (startdate && enddate && startdate != "''" && enddate != "''" &&
    (startdate > enddate)) throw new Error(`Invalid dates: ${startdate} / ${enddate}`)

  qualifiers['P2937'] = 'Q18646856' // 2013-2017 Storting

  return {
    id,
    claims: {
      P39: {
        value: 'Q9045502', // Member of the Storting
        qualifiers: qualifiers,
        references: {
          P143: 'Q191769', // Norwegian Wikipedia
          P4656: 'https://no.wikipedia.org/wiki/Liste_over_stortingsrepresentanter_2001%E2%80%932005'
        },
      }
    }
  }
}
