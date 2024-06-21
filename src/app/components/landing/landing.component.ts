import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  ideasButtons: any = [
    { id: 1, name: 'Board', description: 'Description 1', imageUrl: 'assets/welcome/board_screenshot.jpg' },
    { id: 2, name: 'List', description: 'Description 2', imageUrl: 'assets/welcome/board_screenshot.jpg' },
    { id: 3, name: 'Calendar', description: 'the ultimate tool for note management helps you harness your creativity and reign in your note, you harness your creativity and reign in your note', imageUrl: 'assets/welcome/board_screenshot.svg' },
    { id: 4, name: 'Table', description: 'Description 4', imageUrl: 'assets/welcome/board_screenshot.jpg' },
    { id: 5, name: 'Empty page', description: 'Description 5', imageUrl: 'assets/welcome/board_screenshot.jpg' }
  ];

  tripleSection: any = [
    { id: 1, name: 'Variable notes', description: 'You can capture your ideas in various formats, whether it\'s tables, boards, galleries, and more, adapting to your preferred style of organization', imageUrl: 'assets/welcome/triple_section_1.svg' },
    { id: 2, name: 'Go to your goals', description: 'From structured work-related notes to creatively organizing personal thoughts, our platform empowers you to adapt notes to different contexts ', imageUrl: 'assets/welcome/triple_section_2.svg' },
    { id: 3, name: 'Accessible Simplicity', description: 'Enjoy effortless navigation and a user-friendly interface, ensuring that anyone can quickly understand and utilize our platform to its fullest potential', imageUrl: 'assets/welcome/triple_section_3.svg' }    
  ];

  aboutUs: any = [
    { id: 1, name: 'Red Anna', role: 'UI/UX', text: 'I focus on making our apps easy and enjoyable to use. By understanding what users need, I design clear and attractive interfaces that help people navigate smoothly and feel good using our products.', imageUrl: 'assets/landing/aboutus2.png' },
    { id: 2, name: 'Boiarchuk Bohdan', role: 'Backend developer', text: 'I build and maintain the systems that keep our apps running behind the scenes. My focus is on creating reliable and secure services, making sure everything works correctly and efficiently for our users.', imageUrl: 'assets/landing/aboutus1.png' },
    { id: 3, name: 'Velichko Vladyslav', role: 'UI/UX', text: 'I did all the research in our project. created empathy maps, CJM, etc. After researching pain, my goal was to solve these problems. My task was also to think through the navigation on the site and make it as intuitive as possible', imageUrl: 'assets/landing/aboutus4.png' },
    { id: 4, name: 'Kotlikov Albert', role: 'Frontend developer', text: 'I turn design ideas into interactive and responsive web pages. By writing clean and efficient code, I ensure our apps look good and work smoothly on any device, providing a great experience for all users.', imageUrl: 'assets/landing/aboutus3.png' },
  ];

  faqItems: any[] = [
    { question: 'What can your site be used for?', answer: 'This platform is designed to help you manage your notes efficiently and creatively, allowing you to capture your ideas in various formats.', isOpen: false },
    { question: 'Can I use your site for work?', answer: 'You can use this platform by signing up and creating your first note. The platform supports various formats such as text, lists, boards, and tables.', isOpen: false },
    { question: 'Is there a limit to the number of notes I can create?', answer: 'There is no limit to the number of notes you can create. You can create as many notes as you need.', isOpen: false },
    { question: 'Can I add images and attachments to my notes?', answer: 'Yes, you can add images to your notes to make them more comprehensive.', isOpen: false },
    { question: 'How secure is my data?', answer: 'We take data security very seriously. Your notes are encrypted and securely stored on our servers.', isOpen: false },
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

  getDynamicPadding(buttonName: string) {
    const textLength = buttonName.length;
    let padding = '20px';
    
    if (textLength <= 5) {
      padding = '30px';
    } else if (textLength <= 7) {
      padding = '25px';
    } else {
      padding = '15px';
    }

    return {
      'padding-left': padding,
      'padding-right': padding
    };
  }
  // Метод для переключения состояния FAQ
  toggleFaq(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
