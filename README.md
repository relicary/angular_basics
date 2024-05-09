# Angular

These notes are based in the trainings given by [Fernando Herrera](https://github.com/Klerith) and his training [Angular de cero a experto](https://cursos.devtalles.com/courses/angular)

Angular se compone de cinco bloques fundamentales:

1. **Componentes:** Bloque de código ```HTML``` con su contraparte ```TS``` (una clase)
2. **Servicios:** Lugares centralizados de información
3. **Directivas:** De componentes, estructurales o de atributos
4. **Rutas:** Componentes basados en URL's
5. **Módulos:** Agrupan los cuatro elementos anteriores.

**NOTA:** Desde Angular 17, los proyectos trabajan sin módulos por defecto (```module-less```) Si se desean habilitar los módulos, hay que ejecutar la sentencia ```ng new <app_name> --standalone false``` al crear el proyecto.

## Prerrequisitos

Antes de empezar hay que asegurarse de que se tiene instalado el `ng`

```bash
$> ng version

Angular CLI: 17.2.1
Node: 20.11.1
Package Manager: npm 8.1.2
OS: win32 x64

Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1702.1 (cli-only)
@angular-devkit/core         17.2.1 (cli-only)
@angular-devkit/schematics   17.2.1 (cli-only)
@schematics/angular          17.2.1 (cli-only)

```

Y para crear el proyecto:

```bash
$> ng new bases --no-standalone
    ?> Which stylesheet format would you like to use? CSS
    ?> Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
```

De este modo, se crea un directorio llamado `bases` con los elementos necesarios para trabajar

### ¿Cómo se arranca?

```bash
$> cd bases
$> ng serve -o

- Building...
Initial chunk files | Names         |  Raw size
polyfills.js        | polyfills     |  83.60 kB |
main.js             | main          |  23.11 kB |
styles.css          | styles        |  95 bytes |

                    | Initial total | 106.81 kB
Application bundle generation complete. [4.464 seconds]
Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

Y abre en el navegador la página por defecto del proyecto de Angular `http://localhost:4200`.

**NOTA:** Hasta Angular 17 se han venido usando módulos pero actualmente tiende a ser **standalone components**

### Explicación de los archivos del proyecto

**Archivos no relacionados con Angular:**

* `.editorconfig` es un fichero que configura al VSCode para que todos los participantes sigan el mismo estilo.
* `.gitignore` el fichero que indica qué es lo que se desea subir al repositorio.

**Relacionados con el proyecto Angular:**

* `angular.json` indica a Angular las configuraciones de nuestra aplicación.
* `package-lock.json`
* `package.json` indica el nombre de la app, detalles de arranque y dependencias (para DEV o para PROD)
* `tsconfig.json`

**Archivos del proyecto:**

* `.angular` es un archivo que no se suele modificar. De hecho, no se sube al repositorio. Ayuda a gestionar los cambios rápidamente.
* `.vscode` tampoco suele modificarse y es ignorado por git.
  * En `extensions.json` puede recomendarse un set de extensiones.
  * En `launch`
  * En `tasks`
* `node_modules` Es el directorio que contiene todos los módulos de nodo necesarios para el desarrollo (`npm install`). Al ejecutar el `ng build` solamente crea los archivos mínimos necesarios en un directorio llamado `dist` en la raíz del proyecto.

El más importante es el directorio `src`:

* ```index.html```
* ```main-ts```
* ```styles.css```
* Directorio ```app``` que es donde se contruye todo:
  * ```app-routing```
  * ```component.css```
  * ```component.hmtl```
  * ```component.spec.ts```
  * ```app.component.ts``` El fichero más importante, el principal
  * ```modules.ts```

## Components

El componente, si se observa atentamente, es una clase TS:

```typescript
export class AppComponent {
  public title: string = 'My first Angular app';
  public counter: number = 10;
}
```

Y sobre él, es añadido un **decorator** que indica con qué HTML se relaciona y el CSS de donde debe de recoger sus estilos.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
```

Las properties de la clase `AppComponent` pueden accederse desde el HTML

```html
<h1>{{ title }}</h1>
<hr>
<h3>Counter: {{ counter }}</h3>
```

## Añadir funciones al HTML

En este caso, las funciones también se crean dentro del componente:

```typescript
export class AppComponent {

  public title: string = 'My first Angular app';
  public counter: number = 10;

  increaseBy (value : number) : void {
    this.counter += value;
  }
}
```

Y desde el HTML se llama usando un evento del elemento HTML e indicando la función del componente que se va a llamar.

```html
<button (click)="increaseBy(1)">+1</button>
```

**NOTA:** Cuando en un tag html se usan los paréntesis `()` se está apuntando a un evento o función.

## Crear un nuevo componente

En primer lugar, se crea el directorio del nuevo componente en `app` y dentro, el elemento básico más importante: **el fichero del componente ```counter.component.ts```**


Donde se indica el nombre de la clase (`CounterComponent`), con qué tag HTML se va a identificar `selector: 'app-counter'` y el HTML que va a insertar cuando se llame a dicho tag `template: '<h1>Hola Counter</h1>'`

```typescript
import { Component } from "@angular/core";

@Component({
  selector: 'app-counter',
  template: '<h1>Hola Counter</h1>'
})
export class CounterComponent {

}
```
Seguidamente, hay que añadirlo en el fichero `app.module.ts`

```typescript
@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  /*...*/
})
```

Y, finalmente, en el HTML que lo necesita usar

```html
<hr>
<app-counter></app-counter>
```

**NOTA:** Otra recomendación importante es que el desarrollador debe de intentar que los componentes sean lo más pequeños posible, separándolos por funcionalidad.


## Crear un componente con Angular CLI

También se puede usar el **Angular CLI** para crear un componente con todo lo necesario.

Desde la raíz del proyecto se ejecuta el comando:

```console
$> ng generate component heroes/hero
CREATE src/app/heroes/hero/hero.component.html (20 bytes)
CREATE src/app/heroes/hero/hero.component.spec.ts (610 bytes)
CREATE src/app/heroes/hero/hero.component.ts (201 bytes)
CREATE src/app/heroes/hero/hero.component.css (0 bytes)
UPDATE src/app/app.module.ts (582 bytes)
```

Creando el HTML, el TS, los estilos, el fichero de testing y añadido al módulo de la aplicación.

## One Way Data Binding

En las app's de Angular hay que tratar de priorizar esta vía y la cual evita *infinite loops*

Los métodos precedidos de la palabra reservada `get` actúan como propiedades también dentro de una clase:

```typescript
get capitalizedName(): string {
    return this.name.toUpperCase();
}
```
```html
<dl>
  <td>Capitalized:</td>
  <dd> {{ capitalizedName }} </dd>
</dl>
```

## Llamada a métodos

Los métodos declarados en un componente se invocan desde el HTML usando el nombre del mismo más los parétesis `()`

```typescript
getHeroDescription(): string {
    return `${ this.name } - ${ this.age }`;
}
```
```html
<dl>
  <td>Method:</td>
  <dd> {{ getHeroDescription() }} </dd>
</dl>
```

Los métodos también se pueden asociar a eventos de los elementos HTML

```typescript
changeHero(): void {
  this.name = 'Spiderman';
}
```

```html
<button class="btn btn-primary mx-2" (click)="changeHero()">
  Change name
</button>
```

## ngIf

La directiva ```*ngif ``` borra o añade un elemento en el DOM basándose en la expresión JS que contenga, que se resuelve como un booleano.

```typescript
export class HeroComponent {
  public name : string = 'ironman';
}
```
```html
<button
  *ngIf="name !== 'Spiderman'"
  (click)="changeHero()"
  class="btn btn-primary mx-2">
  Change name
</button>
```

## ngFor

La directiva `*ngfor` recorre un array declarado en el `Component` y permite manejar sus valores.


```typescript
export class ListComponent {
  public heroNames: string[] = ['Spiderman', 'Ironman', 'Hulk', 'She Hulk', 'Thor'];
}
```
```html
<ul class="mt-2 list-group">
  <li
    *ngFor="let name of heroNames"
    class="list-group-item">{{ name }}</li>
</ul>
```

## ngIf-else

La directiva `*ngif-else` permite enlazar dos elementos mediante una **referencia local** dentro de la página usando el símbolo `#`

```html
<div *ngIf="deletedHero; else nothingWasDeleted">
  <h3>Deleted hero <small class="text-danger">{{ deletedHero }}</small></h3>
</div>
<ng-template #nothingWasDeleted>
  <h3>No hero has been deleted</h3>
</ng-template>
```

El tag `ng-template` crea un elemento parecido a `div` que no se renderiza. Solamente espera una condición para dibujarse.

```html
<ng-template #nothingWasDeleted>
  <h3>No hero has been deleted</h3>
</ng-template>
```
```html
<h3>No hero has been deleted</h3>
```
# Módulos

Un **módulo** es el agrupador de una funcionalidad.

> **NOTA:** Los módulos están en desuso a partir de Angular 17.

**¿Cómo pueden crearse manualmentes?**

Dentro del directorio `app`, se crea otro llamado `counter` y anidado al mismo, el directorio `components` donde se almacenarán todos los componentes.

```
├── app
│   ├── counter
|   |   ├── components
|   |   |   ├── counter
|   |   |   |   ├── counter.component.ts
|   |   |   ├── counter.module.ts
```

En el fichero `counter.module.ts` se indican qué componentes pertenecen al módulo y cuáles pueden exportarse.

```typescript
import { NgModule } from "@angular/core";
import { CounterComponent } from "./components/counter/counter.component";

@NgModule({
  declarations: [
    CounterComponent
  ],
  exports: [
    CounterComponent
  ]
})
export class CounterModule {
}
```

De este modo, el nuevo módulo puede declararse en el `app.module.ts` dentro del tag `import`


```typescript
@NgModule({
  imports: [
    CounterModule
  ]
})
export class AppModule { }
```

**¿Y cómo se crea un módulo de forma automática?** Desde el directorio que contiene `src`

```bash
$> ng generate module dbz
CREATE src/app/dbz/dbz.module.ts (201 bytes)
```
O
```bash
$> ng g m dbz
CREATE src/app/dbz/dbz.module.ts (201 bytes)
```

## Módulo DBZ

Se compone de un fichero `dbz-module.ts` y cuatro directorios:

* `pages`
* `components`
* `interfaces`
* `services`

Lo primero, crear un componente en el que pueda agrupar todos los demás componentes. Eso es una **page**: un componente común y corriente que contiene a otros.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent {

}
```

¿De qué se va a componer la pantalla? Lo mejor es pensar en reducir todo a módulos pequeños. Por ejemplo:

* Un listado de personajes
* Un formulario para añadir personajes

Entonces, para cada una de esas partes, se genera un componente:

* list
* add-character

# Decoradores: Comunicación entre componentes

Cualquier componente de una `page` puede necesitar comunicarse con otro. Para lograrlo hay que hacer uso del decorador `@Input`

```typescript
@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  @Input()
  public characterList: Character[] = [{
    name: 'Trunks',
    power: 10
  }];
}
```

¿Qué aporta este decorador?

1. El selector `dbz-list` puede recibir una property llamada `[characterList]`.
2. Y se le puede asignar un valor que se localiza en el componente que lo llama.


```html
  <dbz-list [characterList]="characters"></dbz-list>
```

Donde `characters` es un campo declarado dentro del componente `app-dbz-main-page` y se asigna al componente `dbz-list`.

En otras palabras, el componente Main Page ha transmitido un valor al componente `list`

## Más sobre ngFor

`ngFor` nos da un conjunto de variables con las que podemos controlar nuestro bucle:
* En qué **índice** se está: `index`
* Cuál es el primer elemento: `first`
* Cuál es el último: `last`
* Si el índice es par (`even`) o impar (`odd`)

```html
<li *ngFor="
    let character of characterList;
    let i = index;
    let isFirst = first;
    let isLast = last;
    let isEven = even;
    let isOdd = odd;">
  ...
</li>
```

## ngClass

Permite definir un estilo en el atributo `class` dependiendo de una condición.

```html
<li *ngFor="
      let character of characterList;
      let isLast = last;
      let isEven = even;
    "
    class="list-group-item"
    [ngClass]="{
      'list-group-item-dark': isLast,
      'list-group-item-primary': isEven
    }"
>
```

# Formularios

Los formularios dentro de un `HTML` también se pueden linkar a las properties de un componente.

Para ello, es necesario que la declaración del módulo en el que trabajamos importe `FormsModule`

```typescript
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ...
  ],
  exports: [
    ...
  ],
  imports: [
    ...
    FormsModule
  ]
})
...
```

Mediante la propiedad `[(ngModel)]` puede establecerse una *two way data binding* entre el formulario y el componente al que pertenece.

```typescript
...
@Component({
  ...
})
export class AddCharacterComponent {

  public character: Character = {
    name: '',
    power: 0,
  }
}
```

```html
<input type="text"
    [(ngModel)]="character.name"
    name="name"
    class="form-control mb-2"
    placeholder="Name" />
```

También pueden linkarse métodos del componente a elementos HTML a través de sus eventos.

```typescript
...
@Component({
  ...
})
export class AddCharacterComponent {

  ...

  printCharacter() : void{
    console.log(this.character);
  }
}
```

```html
<button type="submit"
  class="btn btn-primary"
  (click)="printCharacter()">
  Add
</button>
```

### Emisores: Submit de un formulario

`ngSubmit` es el evento en el tag `form` que permite ejecutar el contenido de un formulario.

El proceso para mandar su contenido a otro elemento pasa por el uso de **emisores**

1. Crear en el componente una property de tipo `EventEmitter`
```typescript
export class AddCharacterComponent {
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();
}
```

2. Se le añade el decorador `@Output()` que permite que ese emitter se lea desde otras partes de la aplicación.
```typescript
export class AddCharacterComponent {
  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();
}
```

3. En una función del componente, se especifica cuando se manda (emite) este campo y con qué contenido.
```typescript
export class AddCharacterComponent {
  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  emitCharacter() : void {
    this.onNewCharacter.emit(this.character);
  }
}
```

4. Ese evento se invoca desde el `form` haciendo uso del evento `ngSubmit` 
```html
<form class="row" (ngSubmit)="emitCharacter()">
```

5. El componente que va a recibir la información necesita un método que acepte el tipo de elemento emitido.
```typescript
export class MainPageComponent {
  onNewCharacter(character: Character): void  {
  }
}
```

6. En el HTML que se espera recibir añade la recepción del evento mandado por el hijo y lo gestiona la función del componente.
```html
<dbz-add-character (onNewCharacter)="onNewCharacter($event)"></dbz-add-character>
```

7. ¿Y cómo mandarlo desde `MainPageComponent` a `ListComponent`? En el propio componente se implementa el alamacenado (una lista en este caso)
```typescript
export class MainPageComponent {
  onNewCharacter(character: Character): void  {
    this.characters.push(character);
  }
}
```

> **Nota:** en los HTML, los `()` paréntesis definen un evento/método y los `[]` corchetes campos del componente.

# Services

Los **Servicios** son los elementos en los que se trabaja con los datos.

Su **scope es Singleton:** One Instance Existing

Con el decorador `@Injectable` se indica que se está trabajando en un servicio.

```typescript
@Injectable({
  providedIn: 'root',
})
export class DbzService {

}
```

Y dentro de ese componente se definen tanto las fuentes de datos como los métodos que permiten trabajar sobre ellos.

```typescript
@Injectable({
  providedIn: 'root',
})
export class DbzService {
  public characters: Character[] = [
    {
      name: 'Krillin',
      power: 1000,
    },
    {
      name: 'Goku',
      power: 9500,
    },
    {
      name: 'Vegeta',
      power: 7500,
    },
  ];

  onNewCharacter(character: Character): void {
    this.characters.push(character);
  }

  onDeleteCharacter(id: number): void {
    this.characters.splice(id, 1);
  }
}
```

Dentro del componente se define un `constructor` que instancia al servicio. De ese modo, todo vuelve a quedar linkado.

```typescript
export class MainPageComponent {

  constructor( public dbzService: DbzService ){
  }
}
```

# Despliegues

## UUID

Es un paquete muy popular para la asignación de ID's a elementos.

```
$> > npm i uuid
```

Añadimos una dependencia de desarrollos

$> npm i --save-dev @types/uuid

Y que se declara en los ficheros en que se vaya a usar 

```typescript
import { v4 } from "uuid";
```

Donde v4 es una función que genera ID's.

En primer lugar, hay que indicarle a la interfaz character que tiene un nuevo campo:

```typescript
export interface Character {
  id?: string;
  name: string;
  power: number;
}
```

Tras esto, hay que completar el servicio que es donde (por ahroa) se están declarando los datos

```typescript
export class DbzService {
  public characters: Character[] = [
    {
      id: uuid(),
      name: 'Krillin',
      power: 1000,
    },
    {
      id: uuid(),
      name: 'Goku',
      power: 9500,
    },
    {
      id: uuid(),
      name: 'Vegeta',
      power: 7500,
    },
  ];
```
Tras estos pasos, se modificarán todos los métodos que deseemos que usen el ID


```typescript
```
```typescript
```

