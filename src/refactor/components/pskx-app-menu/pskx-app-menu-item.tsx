import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'pskx-app-menu-item'
})
export class PskxAppMenuItem {
  @Element() host: HTMLElement;

  @Prop() item;

  @Prop() base: string = '';

  @Prop() level: number = 0;

  private mode: string | null = null;

  private _setMode = () => {
    if (!this.mode) {
      let element = this.host.parentElement;
      while (element.tagName.toLowerCase() !== 'pskx-app-menu') {
        element = element.parentElement;
      }
      this.mode = element.getAttribute('mode');
    }
  };

  private _trimmedPath = (path) => {
    return path.endsWith('/') ? path.slice(0, -1) : path
  };

  handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this._setMode();

    if (this.mode === 'vertical') {
      const item = e.currentTarget as HTMLElement;
      const dropdown = item.parentElement;
      dropdown.toggleAttribute('active');
    }
  };

  render() {
    if (!this.item.indexed) { return null; }

    const { path, name, children } = this.item;
    const base = this._trimmedPath(this.base) + '/~dev-link';
    const href = this._trimmedPath(new URL(path, new URL(base, window.location.origin)).href);
    const dropdown = {
      attributes: {
        class: {
          'dropdown': true,
          [`level-${this.level}`]: true
        }
      },
      items: []
    };

    // console.log({ name, base: this.base, path, url });

    if (children) {
      const props = { base: href, level: this.level + 1 } as any;
      children.forEach(item => {
        props.item = item;
        dropdown.items.push(<pskx-app-menu-item {...props}/>)
      });
    }

    const url = new URL(href).pathname;

    return (
      <Host>
      { !children
        ? <stencil-route-link class="item" url={url} data-test-url={url}>{name}</stencil-route-link>
        : (
          <div {...dropdown.attributes}>
            <div class="item" onClick={this.handleClick.bind(this)}>{name}</div>
            <div class="items">{dropdown.items}</div>
          </div>
        )
      }
      </Host>
    );
  };
}
