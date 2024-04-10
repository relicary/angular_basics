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