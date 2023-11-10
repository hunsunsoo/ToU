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
                    "{\"assetId\":\"asset1\",\"stockSeq\":1,\"statementSeq\":1,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"멸치\",\"stockQuantity\":1,\"stockUnit\":\"kg\",\"stockDate\":\"2023-04-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}"));
            assetList.add(new MockKeyValue("asset2",
                    "{\"assetId\":\"asset2\",\"stockSeq\":2,\"statementSeq\":2,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"문어\",\"stockQuantity\":2,\"stockUnit\":\"kg\",\"stockDate\":\"2023-05-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}"));
            assetList.add(new MockKeyValue("asset3",
                    "{\"assetId\":\"asset3\",\"stockSeq\":3,\"statementSeq\":3,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"연어\",\"stockQuantity\":3,\"stockUnit\":\"kg\",\"stockDate\":\"2023-06-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}"));
            assetList.add(new MockKeyValue("asset4",
                    "{\"assetId\":\"asset4\",\"stockSeq\":4,\"statementSeq\":4,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"고등어\",\"stockQuantity\":4,\"stockUnit\":\"kg\",\"stockDate\":\"2023-07-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}"));
            assetList.add(new MockKeyValue("asset5",
                    "{\"assetId\":\"asset5\",\"stockSeq\":5,\"statementSeq\":5,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"새우\",\"stockQuantity\":5,\"stockUnit\":\"kg\",\"stockDate\":\"2023-08-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}"));
            assetList.add(new MockKeyValue("asset6",
                    "{\"assetId\":\"asset6\",\"stockSeq\":6,\"statementSeq\":6,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"오징어\",\"stockQuantity\":6,\"stockUnit\":\"kg\",\"stockDate\":\"2023-09-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}"));
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

            String assetJson = "{\"assetId\":\"asset1\",\"stockSeq\":1,\"statementSeq\":1,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"멸치\",\"stockQuantity\":1,\"stockUnit\":\"kg\",\"stockDate\":\"2023-04-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}";
            when(stub.getStringState("asset1")).thenReturn(assetJson);

            Asset asset = contract.ReadAsset(ctx, "asset1");

            Asset expectedAsset = new Asset("asset1", 1L, 1L, 1L, "산본", "산본공장", "010-7387-7808", "멸치", 1L, "kg", LocalDateTime.of(2023, 4, 10, 0, 0), "OUT", "UNUSED");
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

        inOrder.verify(stub).putStringState("asset1", "{\"assetId\":\"asset1\",\"stockSeq\":1,\"statementSeq\":1,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"멸치\",\"stockQuantity\":1,\"stockUnit\":\"kg\",\"stockDate\":\"2023-04-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}");
        inOrder.verify(stub).putStringState("asset2", "{\"assetId\":\"asset2\",\"stockSeq\":2,\"statementSeq\":2,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"문어\",\"stockQuantity\":2,\"stockUnit\":\"kg\",\"stockDate\":\"2023-05-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}");
        inOrder.verify(stub).putStringState("asset3", "{\"assetId\":\"asset3\",\"stockSeq\":3,\"statementSeq\":3,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"연어\",\"stockQuantity\":3,\"stockUnit\":\"kg\",\"stockDate\":\"2023-06-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}");
        inOrder.verify(stub).putStringState("asset4", "{\"assetId\":\"asset4\",\"stockSeq\":4,\"statementSeq\":4,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"고등어\",\"stockQuantity\":4,\"stockUnit\":\"kg\",\"stockDate\":\"2023-07-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}");
        inOrder.verify(stub).putStringState("asset5", "{\"assetId\":\"asset5\",\"stockSeq\":5,\"statementSeq\":5,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"새우\",\"stockQuantity\":5,\"stockUnit\":\"kg\",\"stockDate\":\"2023-08-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}");
        inOrder.verify(stub).putStringState("asset6", "{\"assetId\":\"asset6\",\"stockSeq\":6,\"statementSeq\":6,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"오징어\",\"stockQuantity\":6,\"stockUnit\":\"kg\",\"stockDate\":\"2023-09-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}");
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
                    .thenReturn("{ \"assetId\": \"asset1\", \"stockSeq\": 1, \"statementSeq\": 1, \"branchSeq\": 1, \"branchLocation\": \"산본\", \"branchName\": \"산본공장\", \"branchContact\": \"010-7387-7808\", \"stockName\": \"멸치\", \"stockQuantity\": 1, \"stockUnit\": \"kg\", \"stockDate\": \"2023-04-10T00:00\", \"inoutStatus\": \"OUT\", \"useStatus\": \"사용\" }");

            Throwable thrown = catchThrowable(() -> {
                contract.CreateAsset(ctx, "asset1", 1L, 1L, 1L, "산본", "산본공장", "010-7387-7808", "멸치", 1L, "kg", LocalDateTime.of(2023, 4, 10, 0, 0), "OUT", "사용");
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

            Asset asset = contract.CreateAsset(ctx, "asset1", 1L, 1L, 1L, "산본", "산본공장", "010-7387-7808", "멸치", 1L, "kg", LocalDateTime.of(2023, 4, 10, 0, 0), "OUT", "사용");

            assertThat(asset).isEqualTo(new Asset("asset1", 1L, 1L, 1L, "산본", "산본공장", "010-7387-7808", "멸치", 1L, "kg", LocalDateTime.of(2023, 4, 10, 0, 0), "OUT", "사용"));
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
        assertThat(assets).isEqualTo("["
                + "{\"assetId\":\"asset1\",\"stockSeq\":1,\"statementSeq\":1,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"멸치\",\"stockQuantity\":1,\"stockUnit\":\"kg\",\"stockDate\":\"2023-04-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"},"
                + "{\"assetId\":\"asset2\",\"stockSeq\":2,\"statementSeq\":2,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"문어\",\"stockQuantity\":2,\"stockUnit\":\"kg\",\"stockDate\":\"2023-05-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"},"
                + "{\"assetId\":\"asset3\",\"stockSeq\":3,\"statementSeq\":3,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"연어\",\"stockQuantity\":3,\"stockUnit\":\"kg\",\"stockDate\":\"2023-06-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"},"
                + "{\"assetId\":\"asset4\",\"stockSeq\":4,\"statementSeq\":4,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"고등어\",\"stockQuantity\":4,\"stockUnit\":\"kg\",\"stockDate\":\"2023-07-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"},"
                + "{\"assetId\":\"asset5\",\"stockSeq\":5,\"statementSeq\":5,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"새우\",\"stockQuantity\":5,\"stockUnit\":\"kg\",\"stockDate\":\"2023-08-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"},"
                + "{\"assetId\":\"asset6\",\"stockSeq\":6,\"statementSeq\":6,\"branchSeq\":1,\"branchLocation\":\"산본\",\"branchName\":\"산본공장\",\"branchContact\":\"010-7387-7808\",\"stockName\":\"오징어\",\"stockQuantity\":6,\"stockUnit\":\"kg\",\"stockDate\":\"2023-09-10T00:00\",\"inoutStatus\":\"OUT\",\"useStatus\":\"UNUSED\"}]");
    }

    @Nested
    class UpdateAssetTransaction {

        @Test
        public void whenAssetExists() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1"))
                    .thenReturn("{ \"assetId\": \"asset1\", \"stockSeq\": 1, \"statementSeq\": 1, \"branchSeq\": 1, \"branchLocation\": \"산본\", \"branchName\": \"산본공장\", \"branchContact\": \"010-7387-7808\", \"stockName\": \"멸치\", \"stockQuantity\": 1, \"stockUnit\": \"kg\", \"stockDate\": \"2023-04-10T00:00\", \"inoutStatus\": \"OUT\", \"useStatus\": \"UNUSED\" }");

            Asset asset = contract.UpdateAsset(ctx, "asset1", "USED");

            assertThat(asset).isEqualTo(new Asset("asset1", 1L, 1L, 1L, "산본", "산본공장", "010-7387-7808", "멸치", 1L, "kg", LocalDateTime.of(2023, 4, 10, 0, 0), "OUT", "USED"));
        }

        @Test
        public void whenAssetDoesNotExist() {
            AssetTransfer contract = new AssetTransfer();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("asset1")).thenReturn("");

            Throwable thrown = catchThrowable(() -> {
                contract.UpdateAsset(ctx, "asset1", "USED");
            });

            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                    .hasMessage("Asset asset1 does not exist");
            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_NOT_FOUND".getBytes());
        }
    }
}
