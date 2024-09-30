import React, {Fragment, useState} from 'react';
import {observer, inject} from "mobx-react";
import {List, ListItem, ListInput, ListButton, Icon, Page, Navbar, NavRight, BlockTitle, Toggle, Range, Link} from 'framework7-react';
import { useTranslation } from 'react-i18next';
import {f7} from 'framework7-react';
import {Device} from '../../../../../common/mobile/utils/device';
import SvgIcon from '../../../../../common/mobile/lib/component/SvgIcon';
import IconExpandDownIos from '@common-ios-icons/icon-expand-down.svg';
import IconExpandDownAndroid from '@common-android-icons/icon-expand-down.svg';
import IconTextAlignLeftIos from '@common-ios-icons/icon-text-align-left.svg';
import IconTextAlignLeftAndroid from '@common-android-icons/icon-text-align-left.svg';
import IconTextAlignCenterIos from '@common-ios-icons/icon-text-align-center.svg';
import IconTextAlignCenterAndroid from '@common-android-icons/icon-text-align-center.svg';
import IconTextAlignRightIos from '@common-ios-icons/icon-text-align-right.svg';
import IconTextAlignRightAndroid from '@common-android-icons/icon-text-align-right.svg';
import IconWrapInline from '@ios-icons/icon-wrap-inline.svg';
import IconWrapSquare from '@ios-icons/icon-wrap-square.svg';
import IconWrapTight from '@ios-icons/icon-wrap-tight.svg';
import IconWrapThrough from '@ios-icons/icon-wrap-through.svg';
import IconWrapTopBottom from '@ios-icons/icon-wrap-top-bottom.svg';
import IconWrapInfront from '@ios-icons/icon-wrap-infront.svg';
import IconWrapBehind from '@ios-icons/icon-wrap-behind.svg';
import IconImageLibraryIos from '@common-ios-icons/icon-image-library.svg';
import IconImageLibraryAndroid from '@common-android-icons/icon-image-library.svg';
import IconLinkIos from '@common-ios-icons/icon-link.svg';
import IconLinkAndroid from '@common-android-icons/icon-link.svg';
import IconMoveForegroundIos from '@common-ios-icons/icon-move-foreground.svg';
import IconMoveForegroundAndroid from '@common-android-icons/icon-move-foreground.svg';
import IconMoveBackgroundIos from '@common-ios-icons/icon-move-background.svg';
import IconMoveBackgroundAndroid from '@common-android-icons/icon-move-background.svg';
import IconMoveForwardIos from '@common-ios-icons/icon-move-forward.svg';
import IconMoveForwardAndroid from '@common-android-icons/icon-move-forward.svg';
import IconMoveBackwardIos from '@common-ios-icons/icon-move-backward.svg';
import IconMoveBackwardAndroid from '@common-android-icons/icon-move-backward.svg';

const PageWrap = props => {
    const isAndroid = Device.android;
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const storeImageSettings = props.storeImageSettings;
    const imageObject = props.storeFocusObjects.imageObject;

    let wrapType, align, moveText, overlap, distance;

    if (imageObject) {
        wrapType = storeImageSettings.getWrapType(imageObject);
        align = storeImageSettings.getAlign(imageObject);
        moveText = storeImageSettings.getMoveText(imageObject);
        overlap = storeImageSettings.getOverlap(imageObject);
        distance = Common.Utils.Metric.fnRecalcFromMM(storeImageSettings.getWrapDistance(imageObject));
    }

    const metricText = Common.Utils.Metric.getCurrentMetricName();
    const [stateDistance, setDistance] = useState(distance);
    const [wrappingStyle, setWrappingStyle] = useState(wrapType);
    const typesWrapping = {
        inline: _t.textInline,
        square: _t.textSquare,
        tight: _t.textTight,
        through: _t.textThrough,
        'top-bottom': _t.textTopAndBottom,
        infront: _t.textInFront,
        behind: _t.textBehind
    };

    if (!imageObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={t('Edit.textTextWrapping')} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={t('Edit.textWrappingStyle')} after={typesWrapping[wrappingStyle]} link='/edit-image-wrapping-style/' routeProps={{
                    onWrapType: props.onWrapType,
                    wrappingStyle,
                    setWrappingStyle
                }}></ListItem>
            </List>
            {('inline' !== wrappingStyle && 'behind' !== wrappingStyle && 'infront' !== wrappingStyle) &&
                <Fragment>
                    <BlockTitle>{_t.textDistanceFromText}</BlockTitle>
                    <List>
                        <ListItem>
                            <div slot='inner' style={{width: '100%'}}>
                                <Range min={0} max={200} step={1} value={stateDistance}
                                       onRangeChange={(value) => {setDistance(value)}}
                                       onRangeChanged={(value) => {props.onWrapDistance(value)}}
                                ></Range>
                            </div>
                            <div slot='inner-end' style={{minWidth: '60px', textAlign: 'right'}}>
                                {stateDistance + ' ' + metricText}
                            </div>
                        </ListItem>
                    </List>
                </Fragment>
            }
            {wrapType !== 'inline' &&
                <Fragment>
                    <BlockTitle>{_t.textAlign}</BlockTitle>
                    <List>
                        <ListItem className='buttons'>
                            <div className="row">
                                <a className={'button' + (align === Asc.c_oAscAlignH.Left ? ' active' : '')}
                                   onClick={() => {
                                       props.onAlign(Asc.c_oAscAlignH.Left)
                                   }}>
                                    {Device.ios ? 
                                        <SvgIcon symbolId={IconTextAlignLeftIos.id} className={'icon icon-svg'} /> :
                                        <SvgIcon symbolId={IconTextAlignLeftAndroid.id} className={'icon icon-svg'} />
                                    }
                                </a>
                                <a className={'button' + (align === Asc.c_oAscAlignH.Center ? ' active' : '')}
                                   onClick={() => {
                                       props.onAlign(Asc.c_oAscAlignH.Center)
                                   }}>
                                    {Device.ios ? 
                                        <SvgIcon symbolId={IconTextAlignCenterIos.id} className={'icon icon-svg'} /> :
                                        <SvgIcon symbolId={IconTextAlignCenterAndroid.id} className={'icon icon-svg'} />
                                    }
                                </a>
                                <a className={'button' + (align === Asc.c_oAscAlignH.Right ? ' active' : '')}
                                   onClick={() => {
                                       props.onAlign(Asc.c_oAscAlignH.Right)
                                   }}>
                                    {Device.ios ? 
                                        <SvgIcon symbolId={IconTextAlignRightIos.id} className={'icon icon-svg'} /> :
                                        <SvgIcon symbolId={IconTextAlignRightAndroid.id} className={'icon icon-svg'} />
                                    }
                                </a>
                            </div>
                        </ListItem>
                    </List>
                </Fragment>
            }
            <List>
                <ListItem title={_t.textMoveWithText} className={'inline' === wrapType ? 'disabled' : ''}>
                    <Toggle checked={moveText} onToggleChange={() => {props.onMoveText(!moveText)}}/>
                </ListItem>
                <ListItem title={_t.textAllowOverlap}>
                    <Toggle checked={overlap} onToggleChange={() => {props.onOverlap(!overlap)}}/>
                </ListItem>
            </List>
        </Page>
    )
};

const PageWrappingStyle = props => {
    const isAndroid = Device.android;
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const imageObject = props.storeFocusObjects.imageObject;
    const [wrapType, setWrapType] = useState(props.wrappingStyle);

    if (!imageObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={t('Edit.textWrappingStyle')} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textInline} radio checked={wrapType === 'inline'} onClick={() => {
                    setWrapType('inline');
                    props.setWrappingStyle('inline');
                    props.onWrapType('inline');
                }}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapInline.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textSquare} radio checked={wrapType === 'square'} onClick={() => {
                    setWrapType('square');
                    props.setWrappingStyle('square');
                    props.onWrapType('square');
                }}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapSquare.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textTight} radio checked={wrapType === 'tight'} onClick={() => {
                    setWrapType('tight');
                    props.setWrappingStyle('tight');
                    props.onWrapType('tight');
                }}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapTight.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textThrough} radio checked={wrapType === 'through'} onClick={() => {
                    setWrapType('through');
                    props.setWrappingStyle('through');
                    props.onWrapType('through');
                }}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapThrough.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textTopAndBottom} radio checked={wrapType === 'top-bottom'} onClick={() => {
                    setWrapType('top-bottom');
                    props.setWrappingStyle('top-bottom');
                    props.onWrapType('top-bottom');
                }}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapTopBottom.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textInFront} radio checked={wrapType === 'infront'} onClick={() => {
                    setWrapType('infront');
                    props.setWrappingStyle('infront');
                    props.onWrapType('infront');
                }}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapInfront.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textBehind} radio checked={wrapType === 'behind'} onClick={() => {
                    setWrapType('behind');
                    props.setWrappingStyle('behind');
                    props.onWrapType('behind');
                }}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapBehind.id} className={'icon icon-svg'} />
                    }
                </ListItem>
            </List>
        </Page>
    )
}

const PageLinkSettings = props => {
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const [stateValue, setValue] = useState('');
    const onReplace = () => {
        if (stateValue.trim().length > 0) {
            if ((/((^https?)|(^ftp)):\/\/.+/i.test(stateValue))) {
                props.onReplaceByUrl(stateValue.trim());
            } else {
                f7.dialog.alert(_t.textNotUrl, _t.notcriticalErrorTitle);
            }
        } else {
            f7.dialog.alert(_t.textEmptyImgUrl, _t.notcriticalErrorTitle);
        }
    };
    return (
        <Page>
            <Navbar title={_t.textLinkSettings} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <BlockTitle>{_t.textAddress}</BlockTitle>
            <List>
                <ListInput
                    type='text'
                    placeholder={_t.textImageURL}
                    value={stateValue}
                    onChange={(event) => {setValue(event.target.value)}}
                >
                </ListInput>
            </List>
            <List className="buttons-list">
                <ListButton className={'button-fill button-raised' + (stateValue.length < 1 ? ' disabled' : '')} title={_t.textReplaceImage} onClick={() => {onReplace()}}></ListButton>
            </List>
        </Page>
    )
};

const PageReplace = props => {
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const imageObject = props.storeFocusObjects.imageObject;
    if (!imageObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }
    return (
        <Page>
            <Navbar title={_t.textReplace} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textPictureFromLibrary} onClick={() => {props.onReplaceByFile()}}>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconImageLibraryIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconImageLibraryAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textPictureFromURL} link='/edit-image-link/' routeProps={{
                    onReplaceByUrl: props.onReplaceByUrl
                }}>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconLinkIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconLinkAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
            </List>
        </Page>
    )
};

const PageReorder = props => {
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const imageObject = props.storeFocusObjects.imageObject;
    if (!imageObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }
    return (
        <Page>
            <Navbar title={t('Edit.textArrange')} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textBringToForeground} link='#' onClick={() => {props.onReorder('all-up')}} className='no-indicator'>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconMoveForegroundIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveForegroundAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textSendToBackground} link='#' onClick={() => {props.onReorder('all-down')}} className='no-indicator'>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconMoveBackgroundIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveBackgroundAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textMoveForward} link='#' onClick={() => {props.onReorder('move-up')}} className='no-indicator'>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconMoveForwardIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveForwardAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textMoveBackward} link='#' onClick={() => {props.onReorder('move-down')}} className='no-indicator'>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconMoveBackwardIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveBackwardAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
            </List>
        </Page>
    )
};

const EditImage = props => {
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const storeFocusObjects = props.storeFocusObjects;
    const imageObject = storeFocusObjects.imageObject;
    const pluginGuid = imageObject.asc_getPluginGuid();
    const wrapType = props.storeImageSettings.getWrapType(imageObject);

    return (
        <Fragment>
            <List>
                <ListItem title={t('Edit.textTextWrapping')} link='/edit-image-wrap/' routeProps={{
                    onWrapType: props.onWrapType,
                    onAlign: props.onAlign,
                    onMoveText: props.onMoveText,
                    onOverlap: props.onOverlap,
                    onWrapDistance: props.onWrapDistance
                }}></ListItem>
                <ListItem title={t('Edit.textReplaceImage')} link='/edit-image-replace/' className={pluginGuid ? 'disabled' : ''} routeProps={{
                    onReplaceByFile: props.onReplaceByFile,
                    onReplaceByUrl: props.onReplaceByUrl
                }}></ListItem>
                { wrapType !== 'inline' && <ListItem title={t('Edit.textArrange')} link='/edit-image-reorder/' routeProps={{
                    onReorder: props.onReorder
                }}></ListItem> }
            </List>
            <List className="buttons-list">
                <ListButton className='button-fill button-raised' title={_t.textActualSize} onClick={() => {props.onDefaulSize()}}/>
                <ListButton className='button-red button-fill button-raised' title={t('Edit.textDeleteImage')} onClick={() => {props.onRemoveImage()}}/>
            </List>
        </Fragment>
    )
};

const EditImageContainer = inject("storeFocusObjects", "storeImageSettings")(observer(EditImage));
const PageWrapContainer = inject("storeFocusObjects", "storeImageSettings")(observer(PageWrap));
const PageReplaceContainer = inject("storeFocusObjects")(observer(PageReplace));
const PageReorderContainer = inject("storeFocusObjects")(observer(PageReorder));
const PageLinkSettingsContainer = inject("storeFocusObjects")(observer(PageLinkSettings));
const PageWrappingStyleContainer = inject("storeFocusObjects")(observer(PageWrappingStyle));

export {EditImageContainer as EditImage,
        PageWrapContainer as PageImageWrap,
        PageReplaceContainer as PageImageReplace,
        PageReorderContainer as PageImageReorder,
        PageLinkSettingsContainer as PageLinkSettings,
        PageWrappingStyleContainer as PageWrappingStyle}