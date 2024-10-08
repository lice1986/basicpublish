﻿/**
* DevExpress Analytics (query-builder\dataSource\object\objectSchema.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { deserializeToCollection } from '../_dbSchema';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
export class ObjectDataMemberBase {
    constructor(model) {
        model && (() => {
            this.name = model.name;
            this.displayName = model.displayName;
            this.dataMember = model.dataMember;
        })();
    }
}
export class ObjectParameter extends ObjectDataMemberBase {
    constructor(model) {
        super(model);
        model && (() => {
            this.value = model.value;
            this.type = model.type;
            this.resultType = model.resultType;
        })();
    }
}
export class ObjectDataSourceMethodBase extends ObjectDataMemberBase {
    constructor(model) {
        super(model);
        this.parameters = deserializeToCollection(model.parameters, (parameters) => new ObjectParameter(parameters));
    }
}
export class ObjectDataMember extends ObjectDataSourceMethodBase {
    constructor(model) {
        super(model);
        this.disabled = ko.observable(false);
        this.memberType = model && model.memberType;
        this.isStatic = model.isStatic;
    }
    static empty() {
        return new ObjectDataMember({
            displayName: ObjectDataMember.entireObject(),
            name: ObjectDataMember.entireObject(),
            parameters: []
        });
    }
    isEntireObject() {
        return this.name == ObjectDataMember.entireObject() && this.displayName == ObjectDataMember.entireObject();
    }
    isAvailable() {
        return !this.disabled();
    }
}
ObjectDataMember.entireObject = () => getLocalization('Entire Object', 'AnalyticsCoreStringId.ObjectDSWizard_ConfigureParameters_EntireObject');
export class ObjectCtor extends ObjectDataSourceMethodBase {
}
export class ObjectType extends ObjectDataMemberBase {
    constructor(model) {
        super(model);
        this.ctors = deserializeToCollection(model.ctors, (ctor) => new ObjectCtor(ctor));
        this.members = deserializeToCollection(model.members, (member) => new ObjectDataMember(member));
    }
    updateMembers(selectedCtor) {
        this.members.forEach(member => {
            if (selectedCtor) {
                member.disabled(false);
            }
            else {
                member.disabled(member.isEntireObject() ? true : !member.isStatic);
            }
        });
    }
}
