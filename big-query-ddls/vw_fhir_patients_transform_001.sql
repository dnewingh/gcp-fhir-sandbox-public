SELECT 
publishable
, resourceType
, mockDataRecordId as id
, STRUCT(
    raceExtensionURL as url
    , [mock_data.CreateValueCodingExtensionObject(raceEntryURL, raceCodingSystem, raceCodingCode, raceCodingDisplay)] as extension
  ) as raceExtensionData
, STRUCT(
  ethnicityExtensionURL as url
  , [mock_data.CreateValueCodingExtensionObject(ethnicityEntryURL, ethnicitySystem, ethnicityCode, ethnicityDisplay)] as extension
) as ethnicityExtensionData
, STRUCT(
    birthSexExtensionURL as url
    , birthSexValueCode as valueCode
  ) as birthSexExtensionData
, [
  mock_data.CreateIdentifierEntryObject('usual', identifierCodingSystem, null, identifierCodingCode, identifierCodingDisplay, null, identifierCodingDisplay, identifierSystem, identifierValue)
] as identifier
, gender
, birthDate
, true as active
, [
    STRUCT(
      'usual' as use
      , nameText as text
      , nameFamily as family
      , [nameGiven] as given
    )
  ] as name
, [
    STRUCT(
      telecomSystem as system
      , telecomValue as value
      , telecomUse as use
    )
  ]  as telecom
, [
    STRUCT(
      [addressStreet] as line
      , addressCity as city
      , addressState as state
      , CAST(addressPostalCode AS string) as postalCode
      , STRUCT(
          CAST(addressPeriodStart AS string) as start
          , CAST(addressPeriodEnd AS string) as `end`
        ) as period
    )
  ] as address
FROM `gcp-fhir-sandbox-lab-001.mock_data.raw_patients` rp
--LIMIT 1