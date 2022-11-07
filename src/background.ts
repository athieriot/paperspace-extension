import { Storage } from "@plasmohq/storage"
import {getStateProperty} from "~types";

console.log("Badge update job started")

const updateBadge = (paperspaceApiKey) => {
  console.log("Fetch machine status")

  if (paperspaceApiKey) {
    fetch(process.env.PLASMO_PUBLIC_PAPERSPACE_BASE_URL + '/machines/getMachines', {headers:  { 'X-Api-Key': paperspaceApiKey }})
      .then(response => response.json())
      .then(machines => machines[0])
      .then(machine => {
        if (machine) {
          const stateProperty = getStateProperty(machine.state)

          chrome.action.setBadgeText({text: stateProperty.state})
          chrome.action.setBadgeBackgroundColor({color: stateProperty.borderCss})
        }
      })
  }
}

const storage = new Storage()

storage.get("paperspace_api_key").then(updateBadge).then(() => {
  storage.watch({ "paperspace_api_key": updateBadge })
  setInterval(() => storage.get("paperspace_api_key").then(updateBadge), 60 * 1000)
})
