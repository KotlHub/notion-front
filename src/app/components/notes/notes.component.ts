import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  id!: String
  userId!: String
  teamspaceId!: String
  noteId!: String
  noteFileName!: String
  isFavourite: boolean = false
  isDeleted: boolean = false
}
