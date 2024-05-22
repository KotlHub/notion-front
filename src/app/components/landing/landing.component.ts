import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  ideasButtons: any = [
    { id: 1, name: 'Empty page', description: 'Description 1', imageUrl: 'assets/welcome/board_screenshot.svg' },
    { id: 2, name: 'List', description: 'Description 2', imageUrl: 'assets/welcome/board_screenshot.svg' },
    { id: 3, name: 'Board', description: 'the ultimate tool for note management helps you harness your creativity and reign in your note, you harness your creativity and reign in your note', imageUrl: 'assets/welcome/board_screenshot.svg' },
    { id: 4, name: 'Table', description: 'Description 4', imageUrl: 'assets/welcome/board_screenshot.svg' },
    { id: 5, name: 'Empty page', description: 'Description 5', imageUrl: 'assets/welcome/board_screenshot.svg' }
  ];

  tripleSection: any = [
    { id: 1, name: 'Variable notes', description: 'You can capture your ideas in various formats, whether it\'s tables, boards, galleries, and more, adapting to your preferred style of organization', imageUrl: 'assets/welcome/triple_section_1.svg' },
    { id: 2, name: 'Go to your personal goals', description: 'From structured work-related notes to creatively organizing personal thoughts, our platform empowers you to adapt notes to different contexts ', imageUrl: 'assets/welcome/triple_section_2.svg' },
    { id: 3, name: 'Accessible Simplicity', description: 'Enjoy effortless navigation and a user-friendly interface, ensuring that anyone can quickly understand and utilize our platform to its fullest potential', imageUrl: 'assets/welcome/triple_section_3.svg' }    
  ];

  aboutUs: any = [
    { id: 1, name: 'Red Anna', role: 'UI/UX', text: 'the ultimate tool for note management helps you harness your creativity and reign in your note, you harness your creativity and reign in your note', imageUrl: 'assets/welcome/triple_section_1.svg' },
    { id: 2, name: 'Boiarchuk Bohdan', role: 'Backend developer', text: 'ебашил на си шарике как ёбнутый. хороший мужик одним словом', imageUrl: 'assets/welcome/triple_section_2.svg' },
    { id: 3, name: 'Velichko Vladyslav', role: 'UI/UX', text: 'ебашил на си шарике как ёбнутый. хороший мужик одним словом', imageUrl: 'assets/welcome/triple_section_3.svg' },
    { id: 4, name: 'Kotlikov Albert', role: 'Frontend developer', text: 'ебашил на си шарике как ёбнутый. хороший мужик одним словом', imageUrl: 'assets/welcome/triple_section_1.svg' },
  ];

  faqItems: any[] = [
    { question: 'What can your site be used for?', answer: 'This platform is designed to help you manage your notes efficiently and creatively, allowing you to capture your ideas in various formats.', isOpen: false },
    { question: 'Can I use your site for work?', answer: 'You can use this platform by signing up and creating your first note. The platform supports various formats such as text, lists, boards, and tables.', isOpen: false },
    { question: 'What can your site be used for?', answer: 'Yes, we have a mobile app available for both iOS and Android devices. You can download it from the respective app stores.', isOpen: false },
    { question: 'What can your site be used for?', answer: 'Yes, we have a mobile app available for both iOS and Android devices. You can download it from the respective app stores.', isOpen: false },
    { question: 'What can your site be used for?', answer: 'Yes, we have a mobile app available for both iOS and Android devices. You can download it from the respective app stores.', isOpen: false },
  ];

  selectedButton: any;
  selectedCharacter: any;

  

  ngOnInit() {
    if (this.aboutUs && this.aboutUs.length > 0) {
      this.selectedCharacter = this.aboutUs[0];
    } else {
      console.error('selectedCharacter is undefined or empty');
    }

    if (this.ideasButtons && this.ideasButtons.length > 0) {
      this.selectedButton = this.ideasButtons[0];
    } else {
      console.error('ideasButtons is undefined or empty');
    }
  }

  previousCharacter() {
    const currentIndex = this.aboutUs.indexOf(this.selectedCharacter);
    const previousIndex = (currentIndex - 1 + this.aboutUs.length) % this.aboutUs.length;
    this.selectedCharacter = this.aboutUs[previousIndex];
  }

  nextCharacter() {
    const currentIndex = this.aboutUs.indexOf(this.selectedCharacter);
    const nextIndex = (currentIndex + 1) % this.aboutUs.length;
    this.selectedCharacter = this.aboutUs[nextIndex];
  }

  selectButton(button: any) {
    this.selectedButton = button;
  }

  // Метод для переключения состояния FAQ
  toggleFaq(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
