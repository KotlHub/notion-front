import { Injectable } from '@angular/core';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { NewPageService } from 'src/app/services/new-page.service';
import { Location } from '@angular/common';
import { Subject, Subscription, filter, takeUntil } from 'rxjs';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { LeftMenuService } from 'src/app/services/left-menu.service';

@Injectable({
  providedIn: 'root'
})
export class CreateNewUserItemService {

  constructor(
    private GlobalValuesService: GlobalValuesService,
    private UserService: UserService,
    private editCardListService: EditCardListService,
    private BigModalWindowService: BigModalWindowService,
    private LeftMenuService: LeftMenuService,
    private http: HttpClient,
  ) { }

  createNewMenuItem(headerInput: string, id: string, currentLink: string, icon: string) {
    console.log(headerInput);
    let title = headerInput;
    if(title === '')
      {
        title = 'Untitled';
      }
    const newItem: MenuItem = {
      id: id,
      name: title,
      currentLink: currentLink,
      icon: icon
    };
    
    this.LeftMenuService.addMenuItem(newItem);
   
  }

  sendPage(page: any, pageStr: string, apiStr: string, selectedFiles?: File[])
  {
    const formData = new FormData();

    // Добавляем JSON-данные
    formData.append(pageStr, JSON.stringify(page)); // Сериализуем объект в JSON

    // Добавляем все выбранные файлы
    selectedFiles?.forEach((file, index) => {
      formData.append(`file_${index}`, file, file.name); // Добавляем файлы с уникальными ключами
    });

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`
    });

    // Отправка запроса на бэкенд
    this.http
      .post(this.GlobalValuesService.api + apiStr, formData, {headers})
      .subscribe(
        (response) => {
          console.log('Response:', response); // Успешный ответ
        },
        (error) => {
          console.error('Error:', error); // Обработка ошибок
        }
      );
  }
}
