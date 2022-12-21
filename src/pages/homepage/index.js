import { useEffect, useState } from 'react'
import { Box, Modal, CircularProgress, Stack, Typography, Chip } from "@mui/material"
import { StorageService } from '../../services/storage'
import { BriefEntry } from '../../components/brief-entry'
import { FullEntry } from '../../components/full-entry'
import ChipBox from '../../components/chip/Chip'

const Homepage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [entries, setEntries] = useState([])

  const [filteredEntries, setFilteredEntries] =useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchEntries = () => {
    setLoading(true)
    const allEntries = StorageService.fetchAllEntries()
    setTimeout(() => {
      setEntries(allEntries)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchEntries()
  }, [])


  useEffect(() => {
    let allTagFilter = []
     const filteredEnteries = entries.filter((entry) => entry.tags.includes(...selectedTags))
    for(let entry of entries){
     allTagFilter.push({
      id : entry.id,
      tags : entry.tags.split(",")
     })
    }
    console.log(allTagFilter)
     if(filteredEnteries.length < 1){
      setFilteredEntries(entries)
     }else {
      setFilteredEntries(filteredEnteries)
     }
     
  },[entries , selectedTags])

   



  


  return (
    <>
      <Stack direction="column" spacing={2}>
        <ChipBox allEntries={entries}  setSelectedTags={setSelectedTags}/>
        <Typography variant="h2">All Entries</Typography>
        {
          loading ? <CircularProgress /> : filteredEntries.map(entry => (
            <BriefEntry
              title={entry.title}
              tags={entry.tags}
              createdAt={entry.createdAt}
              onViewClick={() => {
                setOpenModal(true)
                setSelectedEntry(entry)
              }}
            />
          ))
        }
      </Stack>
      <Modal open={openModal}>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <Box sx={{ width: "100%", maxWidth: "80vw" }}>
            {selectedEntry != null && (
              <FullEntry
                title={selectedEntry.title}
                tags={selectedEntry.tags}
                notes={selectedEntry.notes}
                createdAt={selectedEntry.createdAt}
                onClose={() => setOpenModal(false)}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export { Homepage }
