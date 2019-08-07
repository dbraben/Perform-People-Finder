import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PeopleDirectoryWebPartStrings';
import { PeopleDirectory, IPeopleDirectoryProps } from './components/PeopleDirectory/';

export interface IPeopleDirectoryWebPartProps {
  title: string;
}

export default class PeopleDirectoryWebPart extends BaseClientSideWebPart<IPeopleDirectoryWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IPeopleDirectoryProps> = React.createElement(
      PeopleDirectory,
      {
        webUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient,
        title: this.properties.title,
        displayMode: this.displayMode,
        locale: this.getLocaleId(),
        onTitleUpdate: (newTitle: string) => {
          // after updating the web part title in the component
          // persist it in web part properties
          this.properties.title = newTitle;
        }
      }
    );

    ReactDom.render(element, this.domElement);
   // fix z-index after web part is rendered
   this.fixAllZIndex();
  }

  private fixAllZIndex = () => {

    // Adjust z-index for web part zones
    let zIndexContainer = document.querySelectorAll(".CanvasZoneContainer");
    let zIndex = zIndexContainer.length;
  
    zIndexContainer.forEach((elem, index) => {
      (<HTMLElement>elem).style.zIndex = (zIndex - index).toString();
    });
  
    // Adjust z-index for web parts
    let zIndexControlZone = document.querySelectorAll(".ControlZone");
    zIndex = zIndexControlZone.length*5;
    zIndexControlZone.forEach((elem, index) => {
      (<HTMLElement>elem).style.zIndex = (zIndex - index).toString();
      (<HTMLElement>elem).style.position = "relative";
    });
  }
  
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected getLocaleId() : string {
    return this.context.pageContext.cultureInfo.currentUICultureName;
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
