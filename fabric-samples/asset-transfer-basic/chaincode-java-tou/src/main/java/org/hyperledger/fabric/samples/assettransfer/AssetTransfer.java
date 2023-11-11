/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.assettransfer;

import java.util.ArrayList;
import java.util.List;


import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.Contact;
import org.hyperledger.fabric.contract.annotation.Contract;
import org.hyperledger.fabric.contract.annotation.Default;
import org.hyperledger.fabric.contract.annotation.Info;
import org.hyperledger.fabric.contract.annotation.License;
import org.hyperledger.fabric.contract.annotation.Transaction;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;

import com.owlike.genson.Genson;

@Contract(
        name = "basic",
        info = @Info(
                title = "Asset Transfer",
                description = "The hyperlegendary asset transfer",
                version = "0.0.1-SNAPSHOT",
                license = @License(
                        name = "Apache 2.0 License",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"),
                contact = @Contact(
                        email = "a.transfer@example.com",
                        name = "Adrian Transfer",
                        url = "https://hyperledger.example.com")))
@Default
public final class AssetTransfer implements ContractInterface {

    private final Genson genson = new Genson();

    private enum AssetTransferErrors {
        ASSET_NOT_FOUND,
        ASSET_ALREADY_EXISTS
    }

    /**
     * Creates some initial assets on the ledger.
     *
     * @param ctx the transaction context
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public void InitLedger(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        CreateAsset(ctx, "42", "0", 0L, 7L, "인천광역시 남동구 소래역로 12", "남해씨푸드 소래포구항 지점", "02-446-4644", "문어", 2000L, "kg", "2023-09-11 03:12:12", "OUT", "USED");
        CreateAsset(ctx, "75", "42", 5L, 10L, "경기 광명시 소하동 911-28", "(주)재호물산 가공공장 소래포구점", "02-557-5751", "문어", 2000L, "kg", "2023-09-15 16:00:00", "IN", "USED");
        CreateAsset(ctx, "106", "42", 5L, 10L, "경기 광명시 소하동 911-28", "(주)재호물산 가공공장 소래포구점", "02-557-5751", "익힌 문어", 2000L, "kg", "2023-09-15 16:00:00", "OUT", "USED");
        CreateAsset(ctx, "126", "106", 17L, 8L, "경기도 수원시 권선구 경수대로54번길 47", "남해씨푸드 수원점", "02-883-8835", "익힌 문어", 2000L, "kg", "2023-10-17 16:00:00", "IN", "USED");
        CreateAsset(ctx, "133", "106", 17L, 8L, "경기도 수원시 권선구 경수대로54번길 47", "남해씨푸드 수원점", "02-883-8835", "신선한 문어 숙회", 3000L, "kg", "2023-10-22 17:49:00", "OUT", "USED");
        CreateAsset(ctx, "138", "133", 20L, 6L, "인천광역시 미추홀구 인주대로 317", "동림수산 인천점", "02-557-5755", "신선한 문어 숙회", 3000L, "kg", "2023-10-23 16:00:00", "IN", "UNUSED");
    }

    /**
     * Creates a new asset on the ledger.
     * @return the created asset
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public Asset CreateAsset(final Context ctx, final String assetId, final String previousAssetId, final Long statementSeq,
                             final Long branchSeq, final String branchLocation, final String branchName,
                             final String branchContact, final String stockName, final Long stockQuantity,
                             final String stockUnit, final String stockDate, final String inoutStatus, final String useStatus) {
        ChaincodeStub stub = ctx.getStub();

        if (AssetExists(ctx, assetId)) {
            String errorMessage = String.format("Asset %s already exists", assetId);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, AssetTransferErrors.ASSET_ALREADY_EXISTS.toString());
        }

        Asset asset = new Asset(assetId, previousAssetId, statementSeq, branchSeq, branchLocation, branchName,
                branchContact, stockName, stockQuantity, stockUnit, stockDate, inoutStatus, useStatus);
        String assetJSON = genson.serialize(asset);
        stub.putStringState(assetId, assetJSON);

        return asset;
    }

    /**
     * Retrieves an asset with the specified ID from the ledger.
     * @return the asset found on the ledger if there was one
     */
    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public Asset ReadAsset(final Context ctx, final String assetId) {
        ChaincodeStub stub = ctx.getStub();
        String assetJSON = stub.getStringState(assetId);

        if (assetJSON == null || assetJSON.isEmpty()) {
            String errorMessage = String.format("Asset %s does not exist", assetId);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, AssetTransferErrors.ASSET_NOT_FOUND.toString());
        }

        Asset asset = genson.deserialize(assetJSON, Asset.class);
        return asset;
    }

    /**
     * Updates the properties of an asset on the ledger.
     * @return the transferred asset
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public Asset UpdateAsset(final Context ctx, final String assetId, final String newUseStatus) {
        ChaincodeStub stub = ctx.getStub();
        String assetJSON = stub.getStringState(assetId);

        if (assetJSON == null || assetJSON.isEmpty()) {
            String errorMessage = String.format("Asset %s does not exist", assetId);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, AssetTransferErrors.ASSET_NOT_FOUND.toString());
        }

        Asset asset = genson.deserialize(assetJSON, Asset.class);

        Asset newAsset = new Asset(asset.getAssetId(), asset.getPreviousAssetId(), asset.getStatementSeq(), asset.getBranchSeq(),
                asset.getBranchLocation(), asset.getBranchName(),
                asset.getBranchContact(), asset.getStockName(),
                asset.getStockQuantity(), asset.getStockUnit(),
                asset.getStockDate(), asset.getInoutStatus(), newUseStatus);
        // Use Genson to convert the Asset into string, sort it alphabetically and serialize it into a json string
        String sortedJson = genson.serialize(newAsset);
        stub.putStringState(assetId, sortedJson);
        return newAsset;
    }

    /**
     * Deletes asset on the ledger.
     */
//    @Transaction(intent = Transaction.TYPE.SUBMIT)
//    public void DeleteAsset(final Context ctx, final String assetId) {
//        ChaincodeStub stub = ctx.getStub();
//
//        if (!AssetExists(ctx, assetId)) {
//            String errorMessage = String.format("Asset %s does not exist", assetId);
//            System.out.println(errorMessage);
//            throw new ChaincodeException(errorMessage, AssetTransferErrors.ASSET_NOT_FOUND.toString());
//        }
//
//        stub.delState(assetId);
//    }

    /**
     * Checks the existence of the asset on the ledger
     * @return boolean indicating the existence of the asset
     */
    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public boolean AssetExists(final Context ctx, final String assetId) {
        ChaincodeStub stub = ctx.getStub();
        String assetJSON = stub.getStringState(assetId);

        return (assetJSON != null && !assetJSON.isEmpty());
    }

    /**
     * Changes the owner of a asset on the ledger.
     * @return the old owner
     */
//    @Transaction(intent = Transaction.TYPE.SUBMIT)
//    public String TransferAsset(final Context ctx, final String assetID, final Long stockSeq, final String newBranchName) {
//        ChaincodeStub stub = ctx.getStub();
//        String assetJSON = stub.getStringState(assetID);
//
//        if (assetJSON == null || assetJSON.isEmpty()) {
//            String errorMessage = String.format("Asset %s does not exist", assetID);
//            System.out.println(errorMessage);
//            throw new ChaincodeException(errorMessage, AssetTransferErrors.ASSET_NOT_FOUND.toString());
//        }
//
//        Asset asset = genson.deserialize(assetJSON, Asset.class);
//
//        Asset newAsset = new Asset(asset.getAssetId(), asset.getStockSeq(), asset.getStatementSeq(), asset.getBranchSeq(), asset.getBranchLocation(), newBranchName,
//                asset.getBranchContact(), asset.getStockName(), asset.getStockQuantity(), asset.getStockUnit(), asset.getStockDate(), asset.getInoutStatus(), asset.getUseStatus());
//        // Use a Genson to conver the Asset into string, sort it alphabetically and serialize it into a json string
//        String sortedJson = genson.serialize(newAsset);
//        stub.putStringState(assetID, sortedJson);
//
//        return asset.getBranchName();
//    }

    /**
     * Retrieves all assets from the ledger.
     *
     * @param ctx the transaction context
     * @return array of assets found on the ledger
     */
    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String GetAllAssets(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        List<Asset> queryResults = new ArrayList<Asset>();

        // To retrieve all assets from the ledger use getStateByRange with empty startKey & endKey.
        // Giving empty startKey & endKey is interpreted as all the keys from beginning to end.
        // As another example, if you use startKey = 'asset0', endKey = 'asset9' ,
        // then getStateByRange will retrieve asset with keys between asset0 (inclusive) and asset9 (exclusive) in lexical order.
        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");

        for (KeyValue result: results) {
            Asset asset = genson.deserialize(result.getStringValue(), Asset.class);
            System.out.println(asset);
            queryResults.add(asset);
        }

        final String response = genson.serialize(queryResults);

        return response;
    }
}
