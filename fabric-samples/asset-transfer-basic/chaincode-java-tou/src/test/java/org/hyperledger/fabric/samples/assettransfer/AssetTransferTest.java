/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.assettransfer;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InOrder;

public final class AssetTransferTest {

    private final class MockKeyValue implements KeyValue {

        private final String key;
        private final String value;

        MockKeyValue(final String key, final String value) {
            super();
            this.key = key;
            this.value = value;
        }

        @Override
        public String getKey() {
            return this.key;
        }

        @Override
        public String getStringValue() {
            return this.value;
        }

        @Override
        public byte[] getValue() {
            return this.value.getBytes();
        }

    }

    private final class MockAssetResultsIterator implements QueryResultsIterator<KeyValue> {

        private final List<KeyValue> assetList;

        MockAssetResultsIterator() {
            super();

            assetList = new ArrayList<KeyValue>();

            assetList.add(new MockKeyValue("asset1",
                    "{ \"assetID\": \"asset1\", \"quantity\": 1, \"location\": \"산본\", \"contact\": \"010-7387-7808\", \"product\": \"멸치\", \"amount\": 1, \"unit\": \"kg\", \"date\": \"" + LocalDateTime.of(2023, 4, 4, 0, 0) + "\", \"status\": \"OUT\" }"));
            assetList.add(new MockKeyValue("asset2",
                    "{ \"assetID\": \"asset2\", \"quantity\": 2, \"location\": \"산본\", \"contact\": \"010-7387-7808\", \"product\": \"문어\", \"amount\": 2, \"unit\": \"kg\", \"date\": \"" + LocalDateTime.of(2023, 5, 10, 0, 0) + "\", \"status\": \"OUT\" }"));
            assetList.add(new MockKeyValue("asset3",
                    "{ \"assetID\": \"asset3\", \"quantity\": 3, \"location\": \"산본\", \"contact\": \"010-7387-7808\", \"product\": \"연어\", \"amount\": 3, \"unit\": \"kg\", \"date\": \"" + LocalDateTime.of(2023, 6, 10, 0, 0) + "\", \"status\": \"OUT\" }"));
            assetList.add(new MockKeyValue("asset4",
                    "{ \"assetID\": \"asset4\", \"quantity\": 4, \"location\": \"산본\", \"contact\": \"010-7387-7808\", \"product\": \"고등어\", \"amount\": 4, \"unit\": \"kg\", \"date\": \"" + LocalDateTime.of(2023, 7, 10, 0, 0) + "\", \"status\": \"OUT\" }"));
            assetList.add(new MockKeyValue("asset5",
                    "{ \"assetID\": \"asset5\", \"quantity\": 5, \"location\": \"산본\", \"contact\": \"010-7387-7808\", \"product\": \"새우\", \"amount\": 5, \"unit\": \"kg\", \"date\": \"" + LocalDateTime.of(2023, 8, 10, 0, 0) + "\", \"status\": \"OUT\" }"));
            assetList.add(new MockKeyValue("asset6",
                    "{ \"assetID\": \"asset6\", \"quantity\": 6, \"location\": \"산본\", \"contact\": \"010-7387-7808\", \"product\": \"오징어\", \"amount\": 6, \"unit\": \"kg\", \"date\": \"" + LocalDateTime.of(2023, 9, 10, 0, 0) + "\", \"status\": \"OUT\" }"));
        }

        @Override
        public Iterator<KeyValue> iterator() {
            return assetList.iterator();
        }

        @Override
        public void close() throws Exception {
            // do nothing
        }

    }

    @Test
    public void invokeUnknownTransaction() {
        AssetTransfer contract = new AssetTransfer();
        Context ctx = mock(Context.class);

        Throwable thrown = catchThrowable(() -> {
            contract.unknownTransaction(ctx);
        });

        assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                .hasMessage("Undefined contract method called");
        assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo(null);

        verifyZeroInteractions(ctx);
    }

    @Nested
    class InvokeReadAssetTransaction {

        @Test
        public void whenAssetExists() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);

            // JSON 문자열을 변경된 Asset 구조에 맞게 수정
            String assetJson = "{ \"assetId\": \"asset1\", \"stockSeq\": 1, \"statementSeq\": 1, \"branchSeq\": 1, \"branchLocation\": \"산본\", \"branchName\": \"산본공장\", \"branchContact\": \"010-7387-7808\", \"stockName\": \"멸치\", \"stockQuantity\": 1, \"stockUnit\": \"kg\", \"stockDate\": \"2023-04-10T00:00:00\", \"status\": \"OUT\" }";
            when(stub.getStringState("asset1")).thenReturn(assetJson);

            Asset asset = contract.ReadAsset(ctx, "asset1");

            Asset expectedAsset = new Asset("asset1", 1L, 1L, 1L, "산본", "산본공장", "010-7387-7808", "멸치", 1L, "kg", LocalDateTime.of(2023, 4, 10, 0, 0), "OUT");
            assertThat(asset).isEqualTo(expectedAsset);
        }


        @Test
        public void whenAssetDoesNotExist() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1")).thenReturn("");

            Throwable thrown = catchThrowable(() -> {
                contract.ReadAsset(ctx, "asset1");
            });

            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                    .hasMessage("Asset asset1 does not exist");
            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_NOT_FOUND".getBytes());
        }
    }

    @Test
    void invokeInitLedgerTransaction() {
        AssetTransfer contract = new AssetTransfer();
        Context ctx = mock(Context.class);
        ChaincodeStub stub = mock(ChaincodeStub.class);
        when(ctx.getStub()).thenReturn(stub);

        contract.InitLedger(ctx);

        InOrder inOrder = inOrder(stub);

        // 각 asset에 대한 JSON 문자열을 변경된 Asset 구조에 맞게 수정
        inOrder.verify(stub).putStringState("asset1", "{\"assetId\":\"asset1\",\"stockSeq\":1,\"statementSeq\":1,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"멸치\",\"stockQuantity\":1,\"stockUnit\":\"kg\",\"stockDate\":\"2023-04-10T00:00:00\",\"status\":\"OUT\"}");
        inOrder.verify(stub).putStringState("asset2", "{\"assetId\":\"asset2\",\"stockSeq\":2,\"statementSeq\":2,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"문어\",\"stockQuantity\":2,\"stockUnit\":\"kg\",\"stockDate\":\"2023-05-10T00:00:00\",\"status\":\"OUT\"}");
        inOrder.verify(stub).putStringState("asset3", "{\"assetId\":\"asset3\",\"stockSeq\":3,\"statementSeq\":3,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"연어\",\"stockQuantity\":3,\"stockUnit\":\"kg\",\"stockDate\":\"2023-06-10T00:00:00\",\"status\":\"OUT\"}");
        inOrder.verify(stub).putStringState("asset4", "{\"assetId\":\"asset4\",\"stockSeq\":4,\"statementSeq\":4,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"고등어\",\"stockQuantity\":4,\"stockUnit\":\"kg\",\"stockDate\":\"2023-07-10T00:00:00\",\"status\":\"OUT\"}");
        inOrder.verify(stub).putStringState("asset5", "{\"assetId\":\"asset5\",\"stockSeq\":5,\"statementSeq\":5,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"새우\",\"stockQuantity\":5,\"stockUnit\":\"kg\",\"stockDate\":\"2023-08-10T00:00:00\",\"status\":\"OUT\"}");
        inOrder.verify(stub).putStringState("asset6", "{\"assetId\":\"asset6\",\"stockSeq\":6,\"statementSeq\":6,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"오징어\",\"stockQuantity\":6,\"stockUnit\":\"kg\",\"stockDate\":\"2023-09-10T00:00:00\",\"status\":\"OUT\"}");
    }


    @Nested
    class InvokeCreateAssetTransaction {

        @Test
        public void whenAssetExists() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1"))
                    .thenReturn("{ \"assetID\": \"asset1\", \"color\": \"blue\", \"size\": 5, \"owner\": \"Tomoko\", \"appraisedValue\": 300 }");

            Throwable thrown = catchThrowable(() -> {
                contract.CreateAsset(ctx, "asset1", "blue", 45, "Siobhán", 60);
            });

            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                    .hasMessage("Asset asset1 already exists");
            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_ALREADY_EXISTS".getBytes());
        }

        @Test
        public void whenAssetDoesNotExist() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1")).thenReturn("");

            Asset asset = contract.CreateAsset(ctx, "asset1", "blue", 45, "Siobhán", 60);

            assertThat(asset).isEqualTo(new Asset("asset1", "blue", 45, "Siobhán", 60));
        }
    }

    @Test
    void invokeGetAllAssetsTransaction() {
        AssetTransfer contract = new AssetTransfer();
        Context ctx = mock(Context.class);
        ChaincodeStub stub = mock(ChaincodeStub.class);
        when(ctx.getStub()).thenReturn(stub);
        when(stub.getStateByRange("", "")).thenReturn(new MockAssetResultsIterator());

        String assets = contract.GetAllAssets(ctx);

        assertThat(assets).isEqualTo("[{\"appraisedValue\":300,\"assetID\":\"asset1\",\"color\":\"blue\",\"owner\":\"Tomoko\",\"size\":5},"
                + "{\"appraisedValue\":400,\"assetID\":\"asset2\",\"color\":\"red\",\"owner\":\"Brad\",\"size\":5},"
                + "{\"appraisedValue\":500,\"assetID\":\"asset3\",\"color\":\"green\",\"owner\":\"Jin Soo\",\"size\":10},"
                + "{\"appraisedValue\":600,\"assetID\":\"asset4\",\"color\":\"yellow\",\"owner\":\"Max\",\"size\":10},"
                + "{\"appraisedValue\":700,\"assetID\":\"asset5\",\"color\":\"black\",\"owner\":\"Adrian\",\"size\":15},"
                + "{\"appraisedValue\":800,\"assetID\":\"asset6\",\"color\":\"white\",\"owner\":\"Michel\",\"size\":15}]");

    }

    @Nested
    class TransferAssetTransaction {

        @Test
        public void whenAssetExists() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1"))
                    .thenReturn("{ \"assetID\": \"asset1\", \"color\": \"blue\", \"size\": 5, \"owner\": \"Tomoko\", \"appraisedValue\": 300 }");

            String oldOwner = contract.TransferAsset(ctx, "asset1", "Dr Evil");

            assertThat(oldOwner).isEqualTo("Tomoko");
        }

        @Test
        public void whenAssetDoesNotExist() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1")).thenReturn("");

            Throwable thrown = catchThrowable(() -> {
                contract.TransferAsset(ctx, "asset1", "Dr Evil");
            });

            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                    .hasMessage("Asset asset1 does not exist");
            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_NOT_FOUND".getBytes());
        }
    }

//    @Nested
//    class UpdateAssetTransaction {
//
//        @Test
//        public void whenAssetExists() {
//            AssetTransfer contract = new AssetTransfer();
//            Context ctx = mock(Context.class);
//            ChaincodeStub stub = mock(ChaincodeStub.class);
//            when(ctx.getStub()).thenReturn(stub);
//            when(stub.getStringState("asset1"))
//                    .thenReturn("{ \"assetID\": \"asset1\", \"color\": \"blue\", \"size\": 45, \"owner\": \"Arturo\", \"appraisedValue\": 60 }");
//
//            Asset asset = contract.UpdateAsset(ctx, "asset1", "pink", 45, "Arturo", 600);
//
//            assertThat(asset).isEqualTo(new Asset("asset1", "pink", 45, "Arturo", 600));
//        }
//
//        @Test
//        public void whenAssetDoesNotExist() {
//            AssetTransfer contract = new AssetTransfer();
//            Context ctx = mock(Context.class);
//            ChaincodeStub stub = mock(ChaincodeStub.class);
//            when(ctx.getStub()).thenReturn(stub);
//            when(stub.getStringState("asset1")).thenReturn("");
//
//            Throwable thrown = catchThrowable(() -> {
//                contract.TransferAsset(ctx, "asset1", "순천공장");
//            });
//
//            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
//                    .hasMessage("Asset asset1 does not exist");
//            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_NOT_FOUND".getBytes());
//        }
//    }

    @Nested
    class DeleteAssetTransaction {

        @Test
        public void whenAssetDoesNotExist() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1")).thenReturn("");

            Throwable thrown = catchThrowable(() -> {
                contract.DeleteAsset(ctx, "asset1");
            });

            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                    .hasMessage("Asset asset1 does not exist");
            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_NOT_FOUND".getBytes());
        }
    }
}
