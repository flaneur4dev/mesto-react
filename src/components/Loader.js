import { memo } from "react"

function Loader() {
  return (
    <div className="page__loader">
      Mesto
      <span className ="dot dot_loader">.</span>
    </div>
  )
}

export default memo(Loader)
