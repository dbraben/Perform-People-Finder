import * as React from 'react';
import styles from './IndexNavigation.module.scss';
import { IIndexNavigationProps } from '.';
import { Search } from '../Search';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as strings from 'PeopleDirectoryWebPartStrings';

export class IndexNavigation extends React.Component<IIndexNavigationProps, {}> {
  /**
   * Event handler for selecting a tab in the navigation
   */
  private _handleIndexSelect = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>): void => {
    this.props.onIndexSelect(item.props.linkText);
  }

  public shouldComponentUpdate(nextProps: IIndexNavigationProps, nextState: {}, nextContext: any): boolean {
    // Component should update only if the selected tab has changed.
    // This check helps to avoid unnecessary renders
    return this.props.selectedIndex !== nextProps.selectedIndex;
  }

  public render(): React.ReactElement<IIndexNavigationProps> {


    return (
       <Search
        searchQuery={this.props.searchQuery}
        onSearch={this.props.onSearch}
        onClear={this.props.onSearchClear} />
    );
  }
}
