import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

function NoteEditor({ onDeleteNote, currentNote, onUpdateNote, formatDate }) {
	
	const onSaveEditToggle = () => {
		const editButton = document.getElementById("edit");
		const saveButton = document.getElementById("save");
		const noteTitle = document.getElementById("noteTitle");
		const editDate = document.getElementById("editDate");
		const previewDate = document.getElementById("previewDate");
		const editorQuill = document.getElementById("editorQuill");
		const editorTxt = document.getElementById("editorTxt");

		
		editButton.toggleAttribute("hidden");
		saveButton.toggleAttribute("hidden");
		noteTitle.toggleAttribute("readOnly");
		editDate.toggleAttribute("hidden");
		previewDate.toggleAttribute("hidden");
		editorQuill.toggleAttribute("hidden");
		editorTxt.toggleAttribute("readOnly");
			
	};
	
	const onEditTitle = (val) => {
		onUpdateNote({
			id: currentNote.id,
			title: val,
			preview: currentNote.preview,
			lastModified: currentNote.lastModified,
		});
	};

	const onEditPreview = (val) => {
		onUpdateNote({
			id: currentNote.id,
			title: currentNote.title,
			preview: val,
			lastModified: currentNote.lastModified,
		});
	};

	if(!currentNote) return (<div className='noActiveNote'>No Note Selected</div>);

	return (
	<div id="openNoteEdit">
        <div className="noteBanner">
			<div className="titleCard">
				<input type="text" id="noteTitle" value={currentNote.title} onChange={(event) => onEditTitle(event.target.value)} />
				<input type="datetime-local" id="editDate" value={currentNote.lastModified} /> {/* did not figure out datetime selector */}
				<small id="previewDate" hidden>{formatDate(currentNote.lastModified)}</small>
			</div>
			<div className="editDelButtons">
				<button id="save" onClick={() => onSaveEditToggle()}>Save</button>
				<button id="edit" onClick={() => onSaveEditToggle()} hidden>Edit</button>
				<button id="delete" onClick={() => onDeleteNote(currentNote.id)}>Delete</button>
			</div>
		</div>
		<ReactQuill id="editorQuill" theme="snow"  placeholder="Does not save text, text is same for all notes!" />			{/* textbox is present to show functionality because I could not use ReactQuill's value attribute. */}
		<textarea placeholder="This textbox functions as was intended for the ReactQuill." id="editorTxt" value={currentNote.preview} onChange={(event) => onEditPreview(event.target.value)}></textarea>
    </div>
	);
}

export default NoteEditor;