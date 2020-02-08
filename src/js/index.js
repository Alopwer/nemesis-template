import 'normalize.css'
import '../styles/styles.scss'
import './hamburger'
import './slider'
import LazyLoad from "vanilla-lazyload";

var myLazyLoad = new LazyLoad();
// After your content has changed...
myLazyLoad.update();