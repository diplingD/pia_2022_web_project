import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(usernameFromForm, passwordFromForm) {
    const data={
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post('http://localhost:4000/users/login', data);
  }

  loginAdmin(usernameFromForm, passwordFromForm) {
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post('http://localhost:4000/users/loginAdmin', data);
  }

  registerKlijent(usernameForm, firstnameForm, lastnameForm, passwordForm, contactForm, mailForm, uploadedImageForm, statusForm){
    const data = {
      username: usernameForm,
      firstname: firstnameForm,
      lastname: lastnameForm,
      password: passwordForm,
      contact: contactForm,
      mail: mailForm,
      type: 'client',
      image: uploadedImageForm,
      status: statusForm
    }
    
    return this.http.post('http://localhost:4000/users/registerClient', data);
  }

  registerAgencija(usernameForm, passwordForm, contactForm, mailForm, nameForm, addressForm, numberForm, descrForm, uploadedImageForm, statusForm){
    const data = {
      username: usernameForm,
      password: passwordForm,
      contact: contactForm,
      mail: mailForm,
      name: nameForm,
      address: addressForm,
      number: numberForm,
      description: descrForm,
      type: 'agency',
      image: uploadedImageForm,
      status: statusForm
    }
    
    return this.http.post('http://localhost:4000/users/registerAgency', data);
  }


  findClient(usernameForm: string, passwordForm: string){
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post('http://localhost:4000/users/findClient', data);
  }

  findClientByUsername(usernameForm: string){
    const data = {
      username: usernameForm
    }

    return this.http.post('http://localhost:4000/users/findClientByUsername', data);
  }

  findObject(userForm: string, adresaForm: string){
    const data = {
      user: userForm,
      adresa: adresaForm
    }

    return this.http.post('http://localhost:4000/users/findObject', data);
  }

  findAgency(usernameForm: string){
    const data = {
      username: usernameForm
    }

    return this.http.post('http://localhost:4000/users/findAgency', data);
  }

  changePassword(userTypeForm, usernameFromForm, newPasswordFromForm) {
    const data={
      userType: userTypeForm,
      username: usernameFromForm,
      newPassword: newPasswordFromForm
    }

    return this.http.post('http://localhost:4000/users/changePassword', data);
  }

  getAllAgencies() {
    return this.http.get('http://localhost:4000/users/getAllAgencies');
  }

  getAllAgenciesReq() {
    return this.http.get('http://localhost:4000/users/getAllAgenciesReq');
  }

  // pretrazivanje agencija
  searchAgenciesName(nameFromForm) {
    const data={
      name: nameFromForm
    }

    return this.http.post('http://localhost:4000/users/searchAgenciesName', data);
  }
  searchAgenciesAddress(addressFromForm) {
    const data={
      address: addressFromForm
    }

    return this.http.post('http://localhost:4000/users/searchAgenciesAddress', data);
  }
  searchAgencies(nameFromForm, addressFromForm) {
    const data={
      name: nameFromForm,
      address: addressFromForm
    }

    return this.http.post('http://localhost:4000/users/searchAgencies', data);
  }

  // ocenjivanje agencije
  oceniAgenciju(clientForm, agencijaForm, komentarForm, ocenaForm) {
    const data={
      client: clientForm,
      agencija: agencijaForm,
      komentar: komentarForm,
      ocena: ocenaForm
    }

    return this.http.post('http://localhost:4000/users/oceniAgenciju', data);
  }

  editAgencyComm(userForm, agencijaForm, komentarForm, ocenaForm) {
    const data={
      user: userForm,
      agencija: agencijaForm,
      komentar: komentarForm,
      ocena: ocenaForm
    }

    return this.http.post('http://localhost:4000/users/editAgencyComm', data);
  }

  // Dodaj objekat
  addObject(userForm, tipObjForm, adresaObjForm, prostorijeObjForm, kvadraturaForm, canvasForm) {
    const data={
      user: userForm,
      tip: tipObjForm,
      adresa: adresaObjForm,
      prostorije: prostorijeObjForm,
      kvadratura: kvadraturaForm,
      canvas: canvasForm
    }

    return this.http.post('http://localhost:4000/users/addObject', data);
  }

  getAllObjects(userForm) {
    const data={
      user: userForm
    }

    return this.http.post('http://localhost:4000/users/getAllObjects', data);
  }

  editObject(userForm, adresaForm, tipObjForm, adresaObjForm, prostorijeObjForm, kvadraturaForm, canvasForm) {
    const data={
      userEdit: userForm,
      adresaEdit: adresaForm,
      tip: tipObjForm,
      adresa: adresaObjForm,
      prostorije: prostorijeObjForm,
      kvadratura: kvadraturaForm,
      canvas: canvasForm
    }

    return this.http.post('http://localhost:4000/users/editObject', data);
  }

  deleteObject(tipForm, adresaForm) {
    const data={
      tip: tipForm,
      adresa: adresaForm
    }

    return this.http.post('http://localhost:4000/users/deleteObject', data);
  }

  // POSLOVI - ZAHTEVI ======================================================
  addZahtev(userForm, agencijaForm, adresaForm, rokForm, statusForm) {
    const data={
      user: userForm,
      agencija: agencijaForm,
      adresa: adresaForm,
      rok: rokForm,
      status: statusForm
    }

    return this.http.post('http://localhost:4000/users/addZahtev', data);
  }

  getAllRequests(agNameForm) {
    const data={
      agencija: agNameForm
    }

    return this.http.post('http://localhost:4000/users/getAllRequests', data);
  }

  getAllFinishedRequests(agNameForm) {
    const data={
      agencija: agNameForm
    }

    return this.http.post('http://localhost:4000/users/getAllFinishedRequests', data);
  }

  editZahtev(clientForm, agencijaForm, adresaForm, ponudaForm) {
    const data={
      client: clientForm,
      agencija: agencijaForm,
      adresa: adresaForm,
      ponuda: ponudaForm
    }

    return this.http.post('http://localhost:4000/users/editZahtev', data);
  }

  odbijZahtev(clientForm, agencijaForm, adresaForm) {
    const data={
      client: clientForm,
      agencija: agencijaForm,
      adresa: adresaForm
    }

    return this.http.post('http://localhost:4000/users/odbijZahtev', data);
  }

  getAllUserJobs(userForm) {
    const data={
      user: userForm
    }

    return this.http.post('http://localhost:4000/users/getAllUserJobs', data);
  }

  prihvatiPonudu(clientForm, agencijaForm, adresaForm) {
    const data={
      client: clientForm,
      agencija: agencijaForm,
      adresa: adresaForm
    }

    return this.http.post('http://localhost:4000/users/prihvatiPonudu', data);
  }

  odbijPonudu(clientForm, agencijaForm, adresaForm) {
    const data={
      client: clientForm,
      agencija: agencijaForm,
      adresa: adresaForm
    }

    return this.http.post('http://localhost:4000/users/odbijPonudu', data);
  }

  plati(clientForm, agencijaForm, adresaForm) {
    const data={
      client: clientForm,
      agencija: agencijaForm,
      adresa: adresaForm
    }

    return this.http.post('http://localhost:4000/users/plati', data);
  }

  filterJobs(userForm, statusForm) {
    const data={
      user: userForm,
      status: statusForm
    }

    return this.http.post('http://localhost:4000/users/filterJobs', data);
  }

  getAllActiveJobs(agNameForm) {
    const data={
      agencija: agNameForm
    }

    return this.http.post('http://localhost:4000/users/getAllActiveJobs', data);
  }

  findCanvas(userForm, adresaForm) {
    const data={
      user: userForm,
      adresa: adresaForm
    }

    return this.http.post('http://localhost:4000/users/findCanvas', data);
  }

  setCanvas(canvasForm, userForm, adresaForm, gotovoForm) {
    const data={
      canvas: canvasForm,
      user: userForm,
      adresa: adresaForm,
      gotovo: gotovoForm
    }

    return this.http.post('http://localhost:4000/users/setCanvas', data);
  }

  // ADMIN ==================================================
  getAllClients() {
    return this.http.get('http://localhost:4000/users/getAllClients');
  }

  getAllClientsReq() {
    return this.http.get('http://localhost:4000/users/getAllClientsReq');
  }

  updateClient(usernameForm, firstnameForm, lastnameForm, contactForm, mailForm){
    const data = {
      username: usernameForm,
      firstname: firstnameForm,
      lastname: lastnameForm,
      contact: contactForm,
      mail: mailForm
    }

    return this.http.post('http://localhost:4000/users/updateClient', data);
  }

  updateAgency(agencyEditing, agNameEdt, agContactEdt, agMailEdt, agAddrEdt, agDescrEdt){
    const data = {
      username: agencyEditing,
      name: agNameEdt,
      contact: agContactEdt,
      mail: agMailEdt,
      address: agAddrEdt,
      description: agDescrEdt
    }

    return this.http.post('http://localhost:4000/users/updateAgency', data);
  }

  deleteClient(usernameForm) {
    const data={
      username: usernameForm
    }

    return this.http.post('http://localhost:4000/users/deleteClient', data);
  }

  deleteAgency(usernameForm) {
    const data={
      username: usernameForm
    }

    return this.http.post('http://localhost:4000/users/deleteAgency', data);
  }

  editClient(usernameForm, imeForm, prezimeForm, contactForm, mailForm, imageForm) {
    const data={
      username: usernameForm,
      ime: imeForm,
      prezime: prezimeForm,
      contact: contactForm,
      mail: mailForm,
      image: imageForm
    }

    return this.http.post('http://localhost:4000/users/editClient', data);
  }

  editAgency(usernameForm, nameForm, contactForm, mailForm, addressForm, descriptionForm, imageForm) {
    const data={
      username: usernameForm,
      name: nameForm,
      contact: contactForm,
      mail: mailForm,
      address: addressForm,
      description: descriptionForm,
      image: imageForm
    }

    return this.http.post('http://localhost:4000/users/editAgency', data);
  }

  isRated(userForm, agencijaForm) {
    const data={
      user: userForm,
      agencija: agencijaForm
    }

    return this.http.post('http://localhost:4000/users/isRated', data);
  }

  obrisiKomentar(userForm, agencijaForm) {
    const data={
      user: userForm,
      agencija: agencijaForm
    }

    return this.http.post('http://localhost:4000/users/obrisiKomentar', data);
  }

  acceptClient(usernameForm: string, statusForm: string){
    const data = {
      username: usernameForm,
      status: statusForm
    }

    return this.http.post('http://localhost:4000/users/acceptClient', data);
  }

  acceptAgency(usernameForm: string, statusForm: string){
    const data = {
      username: usernameForm,
      status: statusForm
    }

    return this.http.post('http://localhost:4000/users/acceptAgency', data);
  }

  postaviBrRadnika(usernameForm: string, radniciForm: number){
    const data = {
      username: usernameForm,
      radnici: radniciForm
    }

    return this.http.post('http://localhost:4000/users/postaviBrRadnika', data);
  }

  dodajRadnaMestaZahtev(usernameForm: string, radniciForm: number){
    const data = {
      username: usernameForm,
      radnihMestaZahtev: radniciForm
    }

    return this.http.post('http://localhost:4000/users/dodajRadnaMestaZahtev', data);
  }

  odobriRadnaMesta(usernameForm: string, radnaMestaForm: number){
    const data = {
      username: usernameForm,
      radnaMesta: radnaMestaForm
    }

    return this.http.post('http://localhost:4000/users/odobriRadnaMesta', data);
  }

  dodajRadnikeObjektu(userForm: string, adresaForm: string, brRadnikaForm: number){
    const data = {
      user: userForm,
      adresa: adresaForm,
      brRadnika: brRadnikaForm
    }

    return this.http.post('http://localhost:4000/users/dodajRadnikeObjektu', data);
  }

  getAllJobs() {
    return this.http.get('http://localhost:4000/users/getAllJobs');
  }

}
