/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

  function getTotalJumpLength(jumps: number[]): number {
    return jumps.reduce((sum, jump) => sum + jump, 0);
  }  
  
  /*
    2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
    */

    class Student {
      constructor(
        public name: string,
        public handedInOnTime: boolean,
        public passed: boolean = false
      ) {}
    }
    
    function getStudentStatus(student: Student): string {
      const passed = isEligibleForVG(student);
      return passed ? "VG" : "IG";
    }
    
    function isEligibleForVG(student: Student): boolean {
      return student.name === "Sebastian" && student.handedInOnTime;
    }
  
  /*
    3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
    Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
    */
  
    class TemperatureRecord {
      constructor(public city: string, public date: Date, public temperature: number) {}
    }
    
    function averageWeeklyTemperature(records: TemperatureRecord[]): number {
      const oneWeekTimestamp = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const recentTemperatures = records
        .filter(record => record.city === "Stockholm" && record.date.getTime() > oneWeekTimestamp)
        .map(record => record.temperature);
    
      return recentTemperatures.length === 0 ? 0 : calculateAverage(recentTemperatures);
    }
    
    function calculateAverage(temperatures: number[]): number {
      return temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    }    
  
  /*
    4. Följande funktion kommer att presentera ett objekt i dom:en. 
    Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
    */
  
    class Product {
      constructor(
        public name: string,
        public price: number,
        public image: string
      ) {}
    
      createProductElement(): HTMLElement {
        const container = document.createElement("div");
    
        const productName = document.createElement("h4");
        productName.textContent = this.name;
    
        const productImage = document.createElement("img");
        productImage.src = this.image;
    
        const productPrice = document.createElement("strong");
        productPrice.textContent = this.price.toString();
    
        container.append(productName, productImage, productPrice);
    
        return container;
      }
    }
    
    function showProduct(
      name: string,
      price: number,
      amount: number,
      description: string,
      image: string,
      parent: HTMLElement
    ) {
      const product = new Product(name, price, image);
      parent.appendChild(product.createProductElement());
    }       
  
  /*
    5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
    går att göra betydligt bättre. Gör om så många som du kan hitta!
    */

    function createStudentCheckbox(isChecked: boolean): HTMLElement {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isChecked;
      return checkbox;
    }
    
    function presentStudents(students: Student[]): void {
      students.forEach(student => {
        const container = document.createElement("div");
        const studentCheckbox = createStudentCheckbox(student.handedInOnTime);
        container.appendChild(studentCheckbox);
    
        appendToList(student.handedInOnTime, container);
      });
    }
    
    function appendToList(isPassed: boolean, container: HTMLElement): void {
      const listSelector = isPassed ? "ul#passedstudents" : "ul#failedstudents";
      const list = document.querySelector(listSelector);
      list?.appendChild(container);
    }      

  /*
    6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
    Lorem, ipsum, dolor, sit, amet
    Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
    */

    function concatenateStrings(): string {
      const words = ["Lorem", "ipsum", "dolor", "sit", "amet"];
      return words.join(" ");
    }    
  
  /* 
  7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
      Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
      fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
      lösning som är hållbar och skalar bättre. 
  */

      interface User {
        name: string;
        birthday: Date;
        email: string;
        password: string;
        avatar?: string;
        address?: string;
      }
      
      function isUserEligibleForRegistration(user: User): boolean {
        const age = calculateAge(user.birthday);
        return age >= 20;
      }
      
      function calculateAge(birthday: Date): number {
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      
      function createUser(user: User): string | void {
        if (!isUserEligibleForRegistration(user)) {
          return "Du är under 20 år";
        }
        // Logik för att skapa användaren
      }      
  