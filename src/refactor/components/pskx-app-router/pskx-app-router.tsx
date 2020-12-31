import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
// import { MenuItem } from '../../../interfaces/MenuItem';
// import { ExtendedHistoryType } from '../../../interfaces/ExtendedHistoryType';
import { promisifyEventEmit } from '../../utils';

@Component({
  tag: 'pskx-app-router'
})
export class PskxAppRouter {

  @Prop() routes = [];

  @Prop() base: string = '';

  // @Prop() historyType: ExtendedHistoryType;

  @Event({
    eventName: 'cardinal:config:getRouting',
    bubbles: true, composed: true, cancelable: true
  }) getRoutingConfigEvent: EventEmitter

  // @Event({
  //   eventName: 'getHistoryType',
  //   bubbles: true, cancelable: true, composed: true
  // }) getHistoryTypeEvent: EventEmitter;

  async componentWillLoad() {
    try {
      const routing = await promisifyEventEmit(this.getRoutingConfigEvent);
      this.routes = routing.pages;
      this.base = routing.pagesPathname;
      // this.historyType = await promisifyEventEmit(this.getHistoryTypeEvent);
    } catch (error) {
      console.error(error);
    }
  }

  private _trimmedPath = (path) => {
    return path.endsWith('/') ? path.slice(0, -1) : path
  };

  private _renderRoute = ({ href, src }) => {
    const props = {
      url: new URL(href).pathname,
      exact: true,
      component: 'psk-page-loader',
      componentProps: {
        pageUrl: src
      }
    }
    console.log({ src, url: props.url });

    return <stencil-route data-test-url={props.url} data-test-src={src} {...props}/>;
  };

  private _renderRoutes = (routes, path = '', src = this._trimmedPath(this.base)) => {
    if (!Array.isArray(routes) || routes.length === 0) {
      return null;
    }

    path += '/~dev-route';
    src += '/~dev-source';

    return routes.map(route => {
      path = this._trimmedPath(new URL(route.path, new URL(path, window.location.origin)).href);
      src  = this._trimmedPath(new URL(route.src,  new URL(src,  window.location.origin)).href);

      if (route.children) {
        return this._renderRoutes(route.children, path, src);
      } else {
        return this._renderRoute({ href: path, src });
      }
    })
  };

  render() {
    return (
      <Host>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            { this._renderRoutes(this.routes) }
          </stencil-route-switch>
        </stencil-router>
      </Host>
    );
  };
}
