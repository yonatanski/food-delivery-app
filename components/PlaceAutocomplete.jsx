import * as React from "react"
import { useMemo } from "react"
import { useStore } from "../store/store"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
// import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import parse from "autosuggest-highlight/parse"
import throttle from "lodash/throttle"

// You need to create a new one for your application.

function loadScript(src, position, id) {
  if (!position) {
    return
  }

  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.setAttribute("id", id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

export default function GoogleMaps({ setFormData, formData }) {
  const [value, setValue] = React.useState(null)
  const [inputValue, setInputValue] = React.useState("")
  const [options, setOptions] = React.useState([])
  const autoComplete = useStore((state) => state.autoComplete)
  const loaded = React.useRef(false)
  console.log("value", value)
  console.log("inputValue", inputValue)
  console.log("options", options)

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`, document.querySelector("head"), "google-maps")
    }

    loaded.current = true
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback)
      }, 200),
    []
  )
  React.useEffect(() => {
    const autoComplete = (value) => {
      autoComplete(value)
    }
  }, [value])

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === "") {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  return (
    <Autocomplete
      style={{ width: "100%" }}
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      name="address"
      autoComplete
      includeInputInList
      filterSelectedOptions
      //   value={formData.address}
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options)
        console.log("newValue", newValue)
        setValue({ ...formData, address: newValue })
        setFormData({ ...formData, address: newValue.description })
        setValue(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box sx={{ color: "text.secondary", mr: 2 }} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
