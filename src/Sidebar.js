function Sidebar({ note, onAddNote, currentNote, setCurrentNote, formatDate }) {
    return (
        <div id="noteMenu">
            <div className="noteMenuBanner">
                <h1>Notes</h1>
                <button onClick={onAddNote}>+</button>
            </div>
            <div className="noteMenuList">
                {note.map((note) => (
                    <div className={`noteMenuItem ${note.id === currentNote && "active"}`} onClick={() => setCurrentNote(note.id)}>
                        <div className="itemTitle"><strong>{note.title}</strong></div>
                        <p>{note.preview.substr(0, 50) + "..."}</p>
                        <small>{formatDate(note.lastModified)}</small>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Sidebar;