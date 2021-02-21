import {gql} from '@apollo/client'

const storyQuery = gql`
  query storyQuery($uuid: uuid!) {
    stories_by_pk(id: $uuid) {
      id
      name
      areas {
        geojson
      }
      locations {
        geojson
      }
      timelines {
        json
      }
    }
  }
`

export default storyQuery
