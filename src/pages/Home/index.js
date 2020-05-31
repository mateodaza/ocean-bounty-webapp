import React, { useState, useEffect } from 'react'
import Box from '3box'

export default function Home ({children}) {

  const [ accounts, setAccounts ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ name, setName ] = useState(null)
  const spaces = ['ocean-bounty-quillalabs']

  const isWeb3 = typeof window.ethereum != "undefined"

  useEffect(() => {
    getAddressFromMetaMask()
  }, []);

  async function getAddressFromMetaMask() {
    if (!isWeb3) {
      alert("Please install metamask")
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      setAccounts(accounts)
    }
  }
  
  const get3Box =async()=> {
    if(accounts && accounts.length > 0) {
      setLoading(true)
      const provider = await Box.get3idConnectProvider()
      const box = await Box.create(provider)
      await box.auth(spaces, { address: accounts[0] })
      
      const space = await box.openSpace("ocean-bounty-quillalabs")
      await space.syncDone

      await box.syncDone
      const name = await box.public.get('name')
      setName(name || "unknown (you don't have a name in 3box)")
      setLoading(false)
    }else {
      alert("Please connect to metamask")
    }

  }
  return (
    <div className="grid">
    {
      !isWeb3 ? (
      <button onClick={()=>getAddressFromMetaMask()} 
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        connect wallet through metamask
      </button>
      ): (
        <button onClick={()=>get3Box()} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          3box Test
        </button>
      )
    }
    {loading&&(<h3 className="m-4">Loading...</h3>)}
    {name&&(<h3 className="m-4">Hello {name}!</h3>)}
    </div>
  )
}