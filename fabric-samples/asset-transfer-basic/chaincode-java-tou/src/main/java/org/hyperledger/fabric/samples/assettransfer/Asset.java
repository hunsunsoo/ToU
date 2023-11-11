/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.assettransfer;

import java.util.Objects;

import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import com.owlike.genson.annotation.JsonProperty;

@DataType()
public final class Asset {

    @Property()
    private final String assetId;

    @Property()
    private final String previousAssetId;

    @Property()
    private final Long statementSeq;

    @Property()
    private final Long branchSeq;

    @Property()
    private final String branchLocation;

    @Property()
    private final String branchName;

    @Property()
    private final String branchContact;

    @Property()
    private final String stockName;

    @Property()
    private final Long stockQuantity;

    @Property()
    private final String stockUnit;

    @Property()
    private final String stockDate;

    @Property()
    private final String inoutStatus;

    @Property()
    private final String useStatus;


    public String getAssetId() {
        return assetId;
    }

    public String getPreviousAssetId() {
        return previousAssetId;
    }

    public Long getStatementSeq() {
        return statementSeq;
    }

    public Long getBranchSeq() {
        return branchSeq;
    }

    public String getBranchLocation() {
        return branchLocation;
    }

    public String getBranchName() {
        return branchName;
    }

    public String getBranchContact() {
        return branchContact;
    }

    public String getStockName() {
        return stockName;
    }

    public Long getStockQuantity() {
        return stockQuantity;
    }

    public String getStockUnit() {
        return stockUnit;
    }

    public String getStockDate() {
        return stockDate;
    }

    public String getInoutStatus() {
        return inoutStatus;
    }

    public String getUseStatus() {
        return useStatus;
    }


    public Asset(@JsonProperty("assetId") final String assetId, @JsonProperty("stockSeq") final String previousAssetId,
                 @JsonProperty("statementSeq") final Long statementSeq, @JsonProperty("branchSeq") final Long branchSeq,
                 @JsonProperty("branchLocation") final String branchLocation, @JsonProperty("branchName") final String branchName,
                 @JsonProperty("branchContact") final String branchContact, @JsonProperty("stockName") final String stockName,
                 @JsonProperty("stockQuantity") final Long stockQuantity, @JsonProperty("stockUnit") final String stockUnit,
                 @JsonProperty("stockDate") final String stockDate, @JsonProperty("inoutStatus") final String inoutStatus,
                 @JsonProperty("useStatus") final String useStatus) {

        this.assetId = assetId;
        this.previousAssetId = previousAssetId;
        this.statementSeq = statementSeq;
        this.branchSeq = branchSeq;
        this.branchLocation = branchLocation;
        this.branchName = branchName;
        this.branchContact = branchContact;
        this.stockName = stockName;
        this.stockQuantity = stockQuantity;
        this.stockUnit = stockUnit;
        this.stockDate = stockDate;
        this.inoutStatus = inoutStatus;
        this.useStatus = useStatus;
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode())
                + "Asset{"
                + "assetId=" + assetId + ", previousAssetId=" + previousAssetId + ", statementSeq=" + statementSeq + ", branchSeq=" + branchSeq + ", branchLocation='" + branchLocation + '\''
                + ", branchName='" + branchName + '\'' + ", branchContact='" + branchContact + '\'' + ", stockName='" + stockName + '\'' + ", stockQuantity=" + stockQuantity + ", stockUnit='" + stockUnit + '\''
                + ", stockDate='" + stockDate + '\'' + ", inoutStatus='" + inoutStatus + '\'' + ", useStatus='" + useStatus + '\'' + '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAssetId(), getPreviousAssetId(), getStatementSeq(), getBranchSeq(), getBranchLocation(), getBranchName(), getBranchContact(), getStockName(), getStockQuantity(), getStockUnit(), getStockDate(), getInoutStatus(), getUseStatus());
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Asset other = (Asset) obj;
        return Objects.equals(getAssetId(), other.getAssetId()) && Objects.equals(getPreviousAssetId(), other.getPreviousAssetId()) && Objects.equals(getStatementSeq(), other.getStatementSeq())
                && Objects.equals(getBranchSeq(), other.getBranchSeq()) && Objects.equals(getBranchLocation(), other.getBranchLocation()) && Objects.equals(getBranchName(), other.getBranchName())
                && Objects.equals(getBranchContact(), other.getBranchContact()) && Objects.equals(getStockName(), other.getStockName())
                && Objects.equals(getStockQuantity(), other.getStockQuantity()) && Objects.equals(getStockUnit(), other.getStockUnit())
                && Objects.equals(getStockDate(), other.getStockDate()) && Objects.equals(getInoutStatus(), other.getInoutStatus()) && Objects.equals(getUseStatus(), other.getUseStatus());
    }
}
