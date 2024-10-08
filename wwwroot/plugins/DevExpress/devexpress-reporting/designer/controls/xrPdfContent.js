﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPdfContent.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, getLocalization, NotifyAboutWarning } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { ReportRenderingService } from '../services/_reportRenderingService';
import { pdfSource } from './metadata/xrPdfContent';
import { XRControlViewModel } from './xrControl';
import { TodoControlSurface } from './_xrTodoControl';
export class XRPdfContentViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.imageSource = ko.observable('');
        if (!!this.sourceUrl())
            this.source(null);
        const parentSize = () => (this.parentModel() ? this.parentModel().size.width() : 0);
        this._disposables.push(this.sourceUrl.subscribe(newVal => {
            if (!!newVal)
                this.source(null);
            this._getPdfContentData(!!newVal);
        }), this.source.subscribe(newVal => {
            if (!!newVal)
                this.sourceUrl('');
            this._getPdfContentData(!!newVal);
        }), ko.computed(() => {
            if (this.generateOwnPages()) {
                this.size.width(parentSize());
                this.location.x(0);
            }
        }), this.location.x.subscribe(val => {
            if (this.generateOwnPages())
                this.location.x(0);
        }), this.size.width.subscribe(val => {
            if (this.generateOwnPages())
                this.size.width(parentSize());
        }), this.generateOwnPages.subscribe(val => {
            this._getPdfContentData(true);
        }), this.pageRange.subscribe(val => {
            this._getPdfContentData(false);
        }));
        this.generateOwnPages.valueHasMutated();
        this._disposables.push(this.textContent = ko.pureComputed(() => {
            const sourceUrlExpression = this.getExpressionBinding('SourceUrl');
            const sourceExpression = this.getExpressionBinding('Source');
            let prefix = getLocalization('Source', 'DevExpress.XtraReports.UI.XRPdfContent.Source');
            let suffix = getLocalization('(none)', 'DxDesignerStringId.None');
            if ((this.sourceUrl())) {
                prefix = getLocalization('Source Url', 'DevExpress.XtraReports.UI.XRPdfContent.SourceUrl');
                suffix = this.sourceUrl();
            }
            else if (sourceUrlExpression != null) {
                prefix = getLocalization('Source Url', 'DevExpress.XtraReports.UI.XRPdfContent.SourceUrl');
                suffix = sourceUrlExpression;
            }
            else if (this.source()) {
                suffix = getLocalization('PDF Content', 'ReportStringId.XRPdfContent_Content');
            }
            else if (sourceExpression != null) {
                suffix = sourceExpression;
            }
            return prefix + ': ' + suffix;
        }));
    }
    canFit() {
        return this.size.width() / this.size.height() != this.imageWidth / this.imageHeight;
    }
    fitToContent() {
        if (!this.imageSource())
            return;
        const width = this.size.width();
        const height = this.size.height();
        const coif = this.imageWidth / this.imageHeight;
        if (coif === 0 || !this.canFit())
            return;
        if (width / height > this.imageWidth / this.imageHeight) {
            this.size.width(height * coif);
        }
        else {
            this.size.height(width / coif);
        }
    }
    _getPdfContentData(checkSource) {
        const source = this.sourceUrl() || this.source();
        if (this.generateOwnPages() || (checkSource && (!source && !this._sourceItem || !!this._sourceItem && this._sourceItem === source)))
            return;
        this._sourceItem = source;
        ReportRenderingService.getPdfContentData(this).done((result) => {
            this.pageCount(result.PageCount);
            this.imageSource('data:image/png;base64,' + result.Img);
            this.imageWidth = result.Width;
            this.imageHeight = result.Height;
        }).fail(function (jqXHR) {
            NotifyAboutWarning('It is impossible to get Pdf Content Preview');
        });
    }
    _getExpressionNameByPropertyName(propertyName) {
        const modelName = super._getExpressionNameByPropertyName(propertyName);
        if (!!modelName && pdfSource.modelName.indexOf(modelName) !== -1)
            return 'Source';
        return modelName;
    }
}
export class XRPdfContentSurface extends TodoControlSurface {
    constructor(control, context) {
        super(control, context);
        this.selectiontemplate = 'dxrd-pdfcontent-selection';
        this.contenttemplate = 'dxrd-pdfcontent-control-content';
        this.template = 'dxrd-control';
        this.displayText = () => { return this.getControlModel().name(); };
        this.generateOwnPages = control.generateOwnPages;
        this._handles = ko.observable(this._getHandles(this.generateOwnPages()));
        this._disposables.push(this.contentCss = ko.computed(() => {
            const imageSource = control.imageSource();
            if (this.generateOwnPages() || !imageSource)
                return { background: 'unset' };
            return extend({}, { background: ' url(' + imageSource + ') 50% 50% / contain no-repeat content-box transparent' });
        }));
    }
    _getHandles(generateOwnPages) {
        return generateOwnPages ? 's,n' : 'all';
    }
    getResizableOptions(resizeHandler) {
        this._disposables.push(this.generateOwnPages.subscribe((newVal) => {
            this._handles(this._getHandles(newVal));
        }));
        return extend(true, {}, resizeHandler, {
            handles: this._handles
        });
    }
}
